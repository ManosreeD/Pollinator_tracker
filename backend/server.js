const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import routes
const uploadRoutes = require('./routes/upload');
const statsRoutes = require('./routes/stats');
const detectionsRoutes = require('./routes/detections');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Set root directory
app.set('root', __dirname);

// Middleware
app.use(cors());
app.use(express.json());

// Create required directories
const setupDirectories = () => {
  const uploadsDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
  const framesDir = path.join(uploadsDir, 'frames');
  
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  if (!fs.existsSync(framesDir)) {
    console.log('Creating frames directory...');
    fs.mkdirSync(framesDir, { recursive: true });
  }
};

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pollinator_tracker';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Continuing without database - some features will be limited');
  }
};

// Initialize app
const initialize = async () => {
  // Set up directories
  setupDirectories();
  
  // Connect to database
  await connectToDatabase();
  
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));
  
  // Routes
  app.use('/api/upload', uploadRoutes);
  app.use('/api/stats', statsRoutes);
  app.use('/api/detections', detectionsRoutes);

  // Health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
  });

  // Test route
  app.get('/', (req, res) => {
    res.json({ message: 'Pollinator Tracker API is running!' });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
    console.log(`Media files served from http://localhost:${PORT}/uploads`);
    console.log(`Upload API available at: http://localhost:${PORT}/api/upload`);
  });
};

// Start the application
initialize().catch(error => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});