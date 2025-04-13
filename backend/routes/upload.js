const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${Math.floor(Math.random() * 1000000000)}.${file.originalname.split('.').pop()}`);
  }
});

// File filter to accept only images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/avi', 'video/webm', 'video/mov'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, JPG) and videos (MP4, AVI, WebM, MOV) are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB limit
  }
});

// Helper function to check if file is a video
function isVideo(mimetype) {
  return mimetype.startsWith('video/');
}

// Function to check and create directories with proper permissions
function ensureDirectoryExists(dirPath) {
  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    try {
      fs.mkdirSync(absolutePath, { recursive: true, mode: 0o755 });
      console.log(`Created directory: ${absolutePath}`);
    } catch (err) {
      console.error(`Failed to create directory ${absolutePath}:`, err);
      throw new Error(`Failed to create directory ${absolutePath}: ${err.message}`);
    }
  }
  
  // Verify write permissions
  try {
    const testFile = path.join(absolutePath, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log(`Verified write permissions for: ${absolutePath}`);
  } catch (err) {
    console.error(`No write permission to directory ${absolutePath}:`, err);
    throw new Error(`No write permission to directory ${absolutePath}: ${err.message}`);
  }
  
  return absolutePath;
}

// Function to check if FFmpeg is installed
function checkFFmpeg() {
  try {
    // Try to execute FFmpeg version command
    const result = execSync('ffmpeg -version', { stdio: 'pipe' });
    console.log('FFmpeg is installed and working');
    return true;
  } catch (error) {
    console.error('FFmpeg not found. Please install FFmpeg and make sure it is in your PATH.');
    console.error(error);
    return false;
  }
}

// Function to find available Python command
function findPythonCommand() {
  const possibleCommands = ['python', 'python3', 'py'];
  
  for (const cmd of possibleCommands) {
    try {
      execSync(`${cmd} --version`, { stdio: 'pipe' });
      console.log(`Found Python command: ${cmd}`);
      return cmd;
    } catch (err) {
      console.log(`Command '${cmd}' not available`);
    }
  }
  
  // Check for Python in common Windows locations
  const windowsPythonPaths = [
    'C:\\Python39\\python.exe',
    'C:\\Python310\\python.exe',
    'C:\\Python311\\python.exe',
    'C:\\Python312\\python.exe',
    'C:\\Program Files\\Python39\\python.exe',
    'C:\\Program Files\\Python310\\python.exe',
    'C:\\Program Files\\Python311\\python.exe',
    'C:\\Program Files\\Python312\\python.exe',
    'C:\\Program Files (x86)\\Python39\\python.exe',
    'C:\\Program Files (x86)\\Python310\\python.exe',
    'C:\\Program Files (x86)\\Python311\\python.exe',
    'C:\\Program Files (x86)\\Python312\\python.exe'
  ];
  
  for (const pythonPath of windowsPythonPaths) {
    if (fs.existsSync(pythonPath)) {
      console.log(`Found Python at: ${pythonPath}`);
      return pythonPath;
    }
  }
  
  throw new Error('Python interpreter not found. Please make sure Python is installed and added to your PATH.');
}

// Function to process images with YOLOv5 using the Python script
function processImageWithYolo(imagePath) {
  return new Promise((resolve, reject) => {
    // Construct the path to the Python app
    const pythonScript = path.join(__dirname, '../app.py');
    
    console.log(`Processing image with: python "${pythonScript}" "${imagePath}"`);
    // Execute the Python script with the image path
    const command = `python "${pythonScript}" "${imagePath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Python script:', error);
        console.error('stderr:', stderr);
        return reject(new Error('Failed to process image with YOLOv5'));
      }
      
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        console.error('Error parsing Python output:', err);
        console.error('Output was:', stdout);
        reject(new Error('Invalid output from YOLOv5 processor'));
      }
    });
  });
}

// Function to process videos with YOLOv5 using the dedicated Python script
function processVideoWithYolo(videoPath) {
  return new Promise((resolve, reject) => {
    // Check if FFmpeg is installed
    if (!checkFFmpeg()) {
      return reject(new Error('FFmpeg is not installed or not in PATH. Please install FFmpeg to process videos.'));
    }
    
    // Get absolute path of video file
    const absoluteVideoPath = path.resolve(videoPath);
    console.log(`Absolute video path: ${absoluteVideoPath}`);
    
    // Ensure video file exists
    if (!fs.existsSync(absoluteVideoPath)) {
      return reject(new Error(`Video file does not exist at path: ${absoluteVideoPath}`));
    }
    
    // Create main uploads directory if it doesn't exist
    const uploadsDir = ensureDirectoryExists(path.join(__dirname, '../uploads'));
    console.log(`Uploads directory: ${uploadsDir}`);
    
    // Create frames directory with verified permissions
    const framesDir = ensureDirectoryExists(path.join(uploadsDir, 'frames'));
    console.log(`Frames directory: ${framesDir}`);
    
    // Create unique folder for this video's frames with verified permissions
    const videoId = path.basename(videoPath, path.extname(videoPath));
    const videoFramesDir = ensureDirectoryExists(path.join(framesDir, videoId));
    console.log(`Video frames directory: ${videoFramesDir}`);
    
    // Proceed directly with Python script instead of using FFmpeg through Node
    console.log('Calling process_video_simple.py...');
    
    // Construct the path to the simplified Python video processing script
    const pythonScript = path.join(__dirname, '../scripts/process_video_simple.py');
    console.log(`Python script path: ${pythonScript}`);
    
    if (!fs.existsSync(pythonScript)) {
      return reject(new Error(`Python script not found at: ${pythonScript}`));
    }
    
    // Find Python command - preferring "python" first for simplicity
    let pythonCommand = "python";
    try {
      execSync(`${pythonCommand} --version`, { stdio: 'pipe' });
      console.log(`Using Python command: ${pythonCommand}`);
    } catch (err) {
      console.log(`Default "python" command failed, trying alternatives`);
      try {
        pythonCommand = findPythonCommand();
      } catch (pythonErr) {
        return reject(new Error(`Python interpreter not found: ${pythonErr.message}`));
      }
    }
    
    // Execute the Python script with video path and frames directory
    const pythonCommandLine = `${pythonCommand} "${pythonScript}" "${absoluteVideoPath}" "${videoFramesDir}"`;
    console.log(`Executing Python command: ${pythonCommandLine}`);
    
    // Use exec for simpler handling with the simplified script
    exec(pythonCommandLine, (error, stdout, stderr) => {
      if (error) {
        console.error('Error in Python script execution:', error);
        console.error('Python stderr:', stderr);
        return reject(new Error(`Failed to process video: ${error.message}`));
      }
      
      console.log('Python script completed successfully');
      console.log('Python stderr:', stderr);
      
      try {
        // Check if we have valid JSON output
        if (!stdout.trim()) {
          console.error('Python script returned empty output');
          return reject(new Error('Empty output from video processor'));
        }
        
        console.log('Python stdout:', stdout);
        
        // Parse the result from the Python script
        const result = JSON.parse(stdout);
        
        if (result.error) {
          console.error(`Python script reported error: ${result.error}`);
          return reject(new Error(result.error));
        }
        
        // Format response in the same structure as image results
        const formattedResult = {
          presence: result.presence || "None",
          count: result.count || 0,
          frequency: result.frequency || "N/A",
          accuracy: result.accuracy || 0,
          detections: result.detections || [],
          pollinatorCounts: result.pollinatorCounts || {},
          isVideo: true,
          videoPath: videoPath,
          annotatedImage: result.processedFile ? `http://localhost:5000/uploads/${path.basename(result.processedFile)}` : null
        };
        
        console.log('Returning formatted result to client');
        resolve(formattedResult);
      } catch (err) {
        console.error('Error parsing Python output:', err);
        console.error('Raw output was:', stdout);
        reject(new Error('Invalid output from video processor'));
      }
    });
  });
}

// Route to handle file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    
    console.log(`Processing ${isVideo(fileType) ? 'video' : 'image'}: ${filePath}`);
    
    let result;
    if (isVideo(fileType)) {
      result = await processVideoWithYolo(filePath);
    } else {
      result = await processImageWithYolo(filePath);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;