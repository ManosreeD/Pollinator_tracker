const fs = require('fs');
const path = require('path');

// Create directories needed for the application
const uploadsDir = path.join(__dirname, 'uploads');
const framesDir = path.join(uploadsDir, 'frames');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create frames directory if it doesn't exist
if (!fs.existsSync(framesDir)) {
  console.log('Creating frames directory...');
  fs.mkdirSync(framesDir, { recursive: true });
}

console.log('Directory setup complete!');