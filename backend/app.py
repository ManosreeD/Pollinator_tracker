import sys
import os
import pathlib
import torch
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
import uuid
import cv2
import numpy as np

temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'yolov5')))

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

# Create a frames folder to store extracted video frames
FRAMES_FOLDER = os.path.join(UPLOAD_FOLDER, 'frames')
os.makedirs(FRAMES_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'mp4', 'avi', 'mov', 'webm'}

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

device = 'cpu'  # Default to CPU
if torch.cuda.is_available():
    try:
        torch.cuda.empty_cache()
        device = 'cuda'
    except Exception:
        device = 'cpu'

print(f"Using device: {device}")

model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'best.pt'))
yolo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'yolov5'))

# Add YOLOv5 to path
sys.path.append(yolo_path)

# Load model with robust error handling
try:
    print(f"Loading YOLOv5 model from: {model_path}")
    print(f"YOLOv5 path: {yolo_path}")
    model = torch.hub.load(yolo_path, 'custom', path=model_path, source='local', device=device)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def allowed_file(filename):
    """Check if the uploaded file is an allowed image format."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and perform YOLOv5 detection."""
    # Check if model was loaded successfully
    if model is None:
        return jsonify({'error': 'YOLOv5 model not loaded. Check server logs.'}), 500
        
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Only images allowed.'}), 400
    
    # Save file
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
    file.save(filepath)
    print(f"File saved at: {filepath}")

    try:
        # Ensure the file exists and is readable
        if not os.path.exists(filepath):
            return jsonify({'error': 'Failed to save uploaded file'}), 500
            
        # Run inference with the model
        results = model(filepath)
        
        # Process results
        if hasattr(results, 'pandas'):
            detections_df = results.pandas().xyxy[0]
            predictions = detections_df[['xmin', 'ymin', 'xmax', 'ymax', 'confidence', 'class']].values
            names = results.names
        else:
            predictions = results[0].boxes.data.cpu().numpy()
            names = model.names

        detected_objects = []
        pollinator_counts = {}
       
        img = Image.open(filepath)
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except IOError:
            font = ImageFont.load_default()

        for pred in predictions:
            if len(pred) >= 6:  # Ensure prediction has enough elements
                x1, y1, x2, y2, conf, class_id = pred
                class_id = int(class_id)
                if class_id < len(names):  # Ensure class_id is valid
                    class_name = names[class_id]
                    
                    pollinator_counts[class_name] = pollinator_counts.get(class_name, 0) + 1
                    
                    detected_objects.append({
                        "class": class_name,
                        "confidence": float(conf),
                        "bbox": [float(x1), float(y1), float(x2), float(y2)]
                    })
                    
                    confidence = round(float(conf) * 100, 2)
                    text = f"{class_name} ({confidence}%)"
                    bbox = [x1, y1, x2, y2]
                    
                    draw.rectangle(bbox, outline="red", width=3)
                    draw.text((bbox[0], bbox[1] - 10), text, fill="red", font=font)

        output_filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"annotated_{unique_filename}")
        img.save(output_filepath)
        
        most_frequent = max(pollinator_counts.items(), key=lambda x: x[1])[0] if pollinator_counts else "None"
        
        response = {
            "presence": most_frequent,
            "count": len(detected_objects),
            "frequency": f"{most_frequent}: {pollinator_counts.get(most_frequent, 0)} times" if pollinator_counts else "N/A",
            "accuracy": max([obj["confidence"] for obj in detected_objects]) if detected_objects else 0,
            "detections": detected_objects,
            "annotated_image": f"http://localhost:5000/uploads/{os.path.basename(output_filepath)}"
        }

        return jsonify(response)

    except Exception as e:
        print(f"Error during detection: {e}")
        import traceback
        traceback.print_exc()  # Print full error details
        return jsonify({'error': f'Failed to process image with YOLOv5', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
