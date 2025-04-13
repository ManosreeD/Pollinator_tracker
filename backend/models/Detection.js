const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
  fileType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalFileName: String,
  detections: [{
    class: String,
    confidence: Number,
    bbox: [Number]
  }],
  stats: {
    totalCount: Number,
    pollinatorCounts: {
      type: Map,
      of: Number
    },
    mostFrequent: String
  },
  processedFilePath: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Detection', DetectionSchema);