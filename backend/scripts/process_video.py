#!/usr/bin/env python
import sys
import os
import json
import traceback
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import uuid

# Set error handling from the start
try:
    # Debug information
    print(f"Python version: {sys.version}", file=sys.stderr)
    print(f"Current directory: {os.getcwd()}", file=sys.stderr)
    print(f"Script arguments: {sys.argv}", file=sys.stderr)

    # Check arguments
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments. Usage: process_video.py <video_path> <frames_dir>"}))
        sys.exit(1)
        
    video_path = sys.argv[1]
    frames_dir = sys.argv[2]
    
    print(f"Processing video: {video_path}", file=sys.stderr)
    print(f"Frames directory: {frames_dir}", file=sys.stderr)
    
    # Make sure video exists
    if not os.path.exists(video_path):
        print(json.dumps({"error": f"Video file not found: {video_path}"}))
        sys.exit(1)
        
    # Make sure frames directory exists
    if not os.path.exists(frames_dir):
        try:
            os.makedirs(frames_dir, exist_ok=True)
            print(f"Created frames directory: {frames_dir}", file=sys.stderr)
        except Exception as e:
            print(json.dumps({"error": f"Cannot create frames directory: {str(e)}"}))
            sys.exit(1)
    
    # Simple version that just processes frames without YOLOv5
    # Extract frames directly using OpenCV
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(json.dumps({"error": f"Could not open video file: {video_path}"}))
        sys.exit(1)
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 30  # Default to 30fps if value is 0
    
    print(f"Video info: {total_frames} frames, {fps} fps", file=sys.stderr)
    
    # Calculate sampling rate to get a reasonable number of frames (max 30)
    max_frames = 30
    interval = max(1, total_frames // max_frames)
    
    frames = []
    frame_count = 0
    
    # Extract frames
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_count % interval == 0:
            frame_path = os.path.join(frames_dir, f"frame_{frame_count:04d}.jpg")
            success = cv2.imwrite(frame_path, frame)
            if success:
                frames.append(frame_path)
                print(f"Extracted frame {frame_count} to {frame_path}", file=sys.stderr)
            else:
                print(f"Failed to write frame to {frame_path}", file=sys.stderr)
                
        frame_count += 1
            
    cap.release()
    
    # Create a simple montage of frames (no YOLOv5 detection yet)
    if frames:
        try:
            # Create a montage of frames
            sample_img = cv2.imread(frames[0])
            h, w = sample_img.shape[:2]
            
            # Create montage with max 5 frames per row
            cols = min(5, len(frames))
            rows = (len(frames) + cols - 1) // cols
            
            montage = np.zeros((rows * h, cols * w, 3), dtype=np.uint8)
            
            for i, frame_path in enumerate(frames):
                img = cv2.imread(frame_path)
                if img is None:
                    continue
                    
                row = i // cols
                col = i % cols
                montage[row*h:(row+1)*h, col*w:(col+1)*w] = img
            
            # Save montage
            montage_path = os.path.join(os.path.dirname(video_path), f"montage_{os.path.basename(video_path)}.jpg")
            cv2.imwrite(montage_path, montage)
            print(f"Created montage at {montage_path}", file=sys.stderr)
            
            # For now, return simple results with no detections
            # This will be expanded later to use YOLOv5
            result = {
                "detections": [],
                "processedFile": montage_path
            }
            
            print(json.dumps(result))
        except Exception as e:
            print(f"Error creating montage: {str(e)}", file=sys.stderr)
            traceback.print_exc(file=sys.stderr)
            print(json.dumps({"error": f"Error creating frame montage: {str(e)}"}))
    else:
        print(json.dumps({"error": "No frames were extracted from the video"}))

except Exception as e:
    # Catch any unexpected exceptions
    print(f"Uncaught exception: {str(e)}", file=sys.stderr)
    traceback.print_exc(file=sys.stderr)
    print(json.dumps({"error": f"Unexpected error processing video: {str(e)}"}))
    sys.exit(1)