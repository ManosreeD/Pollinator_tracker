const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const Detection = require('../models/Detection');

// Get paginated detections with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, fileType } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const query = {};
    if (fileType) {
      query.fileType = fileType;
    }
    
    const total = await Detection.countDocuments(query);
    
    const detections = await Detection.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const formattedDetections = detections.map(detection => {
      const processedFileUrl = detection.processedFilePath 
        ? `${baseUrl}/uploads/${path.basename(detection.processedFilePath)}` 
        : null;
        
      return {
        _id: detection._id,
        fileType: detection.fileType,
        fileName: detection.fileName,
        originalFileName: detection.originalFileName,
        stats: detection.stats,
        processedFile: processedFileUrl,
        createdAt: detection.createdAt
      };
    });
    
    res.json({
      detections: formattedDetections,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get a specific detection by ID
router.get('/:id', async (req, res, next) => {
  try {
    const detection = await Detection.findById(req.params.id);
    
    if (!detection) {
      return res.status(404).json({ error: 'Detection not found' });
    }
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const processedFileUrl = detection.processedFilePath 
      ? `${baseUrl}/uploads/${path.basename(detection.processedFilePath)}` 
      : null;
    
    res.json({
      ...detection.toObject(),
      processedFile: processedFileUrl
    });
  } catch (error) {
    next(error);
  }
});

// Delete a detection
router.delete('/:id', async (req, res, next) => {
  try {
    const detection = await Detection.findById(req.params.id);
    
    if (!detection) {
      return res.status(404).json({ error: 'Detection not found' });
    }
    
    // Delete the associated files
    try {
      if (detection.processedFilePath) {
        await fs.unlink(path.join(__dirname, '..', detection.processedFilePath));
      }
      
      const filePath = path.join(
        __dirname, 
        '..', 
        process.env.UPLOAD_DIR || 'uploads', 
        detection.fileName
      );
      await fs.unlink(filePath);
      
      // If it's a video, delete the frames directory
      if (detection.fileType === 'video') {
        const framesDir = path.join(
          __dirname, 
          '..', 
          process.env.UPLOAD_DIR || 'uploads',
          'frames', 
          path.parse(detection.fileName).name
        );
        
        // Check if directory exists before attempting to delete
        try {
          await fs.access(framesDir);
          await fs.rm(framesDir, { recursive: true, force: true });
        } catch (err) {
          if (err.code !== 'ENOENT') throw err;
          // Directory doesn't exist, ignore
        }
      }
    } catch (fileErr) {
      console.error('Error deleting files:', fileErr);
      // Continue even if file deletion fails
    }
    
    await detection.deleteOne();
    
    res.json({ message: 'Detection deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;