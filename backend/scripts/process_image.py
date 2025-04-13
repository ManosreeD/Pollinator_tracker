import sys
import os
import json
import torch
import pathlib
from PIL import Image, ImageDraw, ImageFont
import uuid

# Fix for Windows path issues
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

# Add YOLOv5 to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'yolov5')))

def process_image(image_path):
    """Process an image with YOLOv5 and return detection results."""
    try:
        # Load model
        model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'best.pt'))
        yolo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'yolov5'))
        model = torch.hub.load(yolo_path, 'custom', path=model_path, source='local')
        
        # Run inference
        results = model(image_path)
        
        # Process results
        if hasattr(results, 'pandas'):
            detections_df = results.pandas().xyxy[0]
            predictions = detections_df[['xmin', 'ymin', 'xmax', 'ymax', 'confidence', 'class']].values
            names = results.names
        else:
            predictions = results[0].boxes.data.cpu().numpy()
            names = model.names
            
        # Process detections
        detected_objects = []
        
        # Create annotated image
        img = Image.open(image_path)
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except IOError:
            font = ImageFont.load_default()
            
        for pred in predictions:
            x1, y1, x2, y2, conf, class_id = pred
            class_id = int(class_id)
            class_name = names[class_id]
            
            detected_objects.append({
                "class": class_name,
                "confidence": float(conf),
                "bbox": [float(x1), float(y1), float(x2), float(y2)]
            })
            
            # Draw bounding box and label
            confidence = round(float(conf) * 100, 2)
            text = f"{class_name} ({confidence}%)"
            bbox = [x1, y1, x2, y2]
            
            draw.rectangle(bbox, outline="red", width=3)
            draw.text((bbox[0], bbox[1] - 10), text, fill="red", font=font)
        
        # Save annotated image
        output_filepath = os.path.join(os.path.dirname(image_path), f"annotated_{os.path.basename(image_path)}")
        img.save(output_filepath)
        
        return {
            "detections": detected_objects,
            "processedFile": output_filepath
        }
    except Exception as e:
        print(f"Error processing image: {str(e)}", file=sys.stderr)
        raise

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    try:
        image_path = sys.argv[1]
        result = process_image(image_path)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)