const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');

// Get general statistics
router.get('/', async (req, res, next) => {
  try {
    // Get total number of detections
    const totalScans = await Detection.countDocuments();
    
    // Get total detections by file type
    const videoVsImageCounts = {
      video: await Detection.countDocuments({ fileType: 'video' }),
      image: await Detection.countDocuments({ fileType: 'image' })
    };
    
    // Calculate pollinator frequency across all detections
    const detections = await Detection.find();
    
    let totalDetections = 0;
    const pollinatorCounts = {};
    
    detections.forEach(detection => {
      totalDetections += detection.stats.totalCount || 0;
      
      // Add up pollinator counts from all detections
      if (detection.stats.pollinatorCounts) {
        for (const [species, count] of Object.entries(detection.stats.pollinatorCounts)) {
          pollinatorCounts[species] = (pollinatorCounts[species] || 0) + count;
        }
      }
    });
    
    // Sort pollinators by frequency
    const sortedPollinators = Object.entries(pollinatorCounts)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    
    res.json({
      totalScans,
      totalDetections,
      videoVsImageCounts,
      mostFrequentPollinators: sortedPollinators
    });
  } catch (error) {
    next(error);
  }
});

// Get daily statistics
router.get('/daily', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const detections = await Detection.find(query).sort({ createdAt: 1 });
    
    // Group detections by date
    const dailyStats = {};
    
    detections.forEach(detection => {
      const date = detection.createdAt.toISOString().split('T')[0];
      
      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          totalScans: 0,
          totalDetections: 0,
          pollinatorCounts: {}
        };
      }
      
      dailyStats[date].totalScans += 1;
      dailyStats[date].totalDetections += detection.stats.totalCount || 0;
      
      // Add pollinator counts
      if (detection.stats.pollinatorCounts) {
        for (const [species, count] of Object.entries(detection.stats.pollinatorCounts)) {
          dailyStats[date].pollinatorCounts[species] = 
            (dailyStats[date].pollinatorCounts[species] || 0) + count;
        }
      }
    });
    
    res.json(Object.values(dailyStats));
  } catch (error) {
    next(error);
  }
});

module.exports = router;