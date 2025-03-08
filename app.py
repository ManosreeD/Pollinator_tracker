from flask import Flask, request, jsonify
import os
import uuid
import torch
import cv2
import numpy as np
from flask_cors import CORS
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
from ultralytics import YOLO
import pathlib



app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

# Load YOLOv5 model


temp=pathlib.PosixPath
pathlib.PosixPath =pathlib.WindowsPath
model_path = "C:/Users/manos/OneDrive/Desktop/train_data/yolov5/best.pt"  # Use forward slashes
model = YOLO(model_path) 


device = torch.device('cpu')  # Force CPU
model.to(device)

def allowed_file(filename):
    """Check if the uploaded file is an allowed image format."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and perform YOLOv5 detection."""
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

    # Perform object detection
    try:
        results = model(filepath)  # Run YOLOv5 inference
        predictions = results.pandas().xyxy[0]  # Extract detections in DataFrame

        detected_objects = []
        
        # Open image for drawing class names
        img = Image.open(filepath)
        draw = ImageDraw.Draw(img)
        
        # Optional: If you want to use a custom font, add it like this
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except IOError:
            font = ImageFont.load_default()

        # Draw class names on the image and prepare detection data
        for _, row in predictions.iterrows():
            detected_objects.append({
                "class": row["name"],  # Pollinator class
                "confidence": round(float(row["confidence"]) * 100, 2),
                "bbox": [row["xmin"], row["ymin"], row["xmax"], row["ymax"]]
            })
            
            # Draw the class name on the image
            class_name = row["name"]
            confidence = round(float(row["confidence"]) * 100, 2)
            text = f"{class_name} ({confidence}%)"
            bbox = [row["xmin"], row["ymin"], row["xmax"], row["ymax"]]
            
            # Draw rectangle and class name
            draw.rectangle(bbox, outline="red", width=3)
            draw.text((bbox[0], bbox[1] - 10), text, fill="red", font=font)

        # Save the image with annotations
        output_filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"annotated_{unique_filename}")
        img.save(output_filepath)

        response = {
            "file": unique_filename,
            "detections": detected_objects,
            "count": len(detected_objects),
            "annotated_image": output_filepath  # Provide the path to the annotated image
        }

        return jsonify(response)

    except Exception as e:
        print(f"Error during detection: {e}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
