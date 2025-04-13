import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Loader2, Image as ImageIcon, Film } from 'lucide-react';

/**
 * File uploader component that handles image and video uploads
 */
const FileUploader = ({ onUpload, loading }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type.split('/')[0]);
      setUploadProgress(0); // Reset progress when new file is selected
    }
  };
  
  const handleUploadClick = () => {
    if (file && !loading) {
      // If it's a video file, show progress simulation
      if (fileType === 'video') {
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            // Simulate upload progress
            const newProgress = prev + (Math.random() * 10);
            // Stop at 95% - the actual completion will be handled by the parent
            if (newProgress >= 95) {
              clearInterval(interval);
              return 95;
            }
            return newProgress;
          });
        }, 300);
        
        // Upload the file
        onUpload(file).finally(() => {
          clearInterval(interval);
          setUploadProgress(100);
        });
      } else {
        onUpload(file);
      }
    }
  };
  
  const renderFilePreview = () => {
    if (!file) return null;
    
    return (
      <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
        <p className="font-medium text-yellow-700 mb-2">Preview:</p>
        
        {fileType === 'image' ? (
          <img 
            src={URL.createObjectURL(file)} 
            alt="Preview" 
            className="w-full h-48 object-contain rounded-lg"
          />
        ) : (
          <video 
            src={URL.createObjectURL(file)} 
            controls
            className="w-full h-48 object-contain rounded-lg"
          />
        )}
        
        <p className="text-xs text-yellow-600 mt-2">
          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
        
        {fileType === 'video' && loading && (
          <div className="mt-3">
            <div className="h-2 w-full bg-yellow-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-yellow-600 mt-1 text-center">
              {uploadProgress < 100 ? 'Processing video frames...' : 'Processing complete!'}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="text-center mb-4">
        <p className="text-lg text-yellow-600 font-medium mb-2">
          Upload an image or video to detect pollinators
        </p>
        <div className="flex justify-center items-center mb-3">
          <Sparkles className="mx-auto text-yellow-500" size={36} />
        </div>
      </div>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-800 border border-yellow-300 rounded-xl cursor-pointer bg-yellow-100 hover:bg-yellow-200 focus:outline-none transition-all duration-150 p-2"
      />

      {renderFilePreview()}

      <button
        disabled={!file || loading}
        onClick={handleUploadClick}
        className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg mt-4"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            {fileType === 'video' ? "Processing Video..." : "Processing..."}
          </>
        ) : (
          <>
            <UploadCloud size={20} />
            Upload & Detect
          </>
        )}
      </button>
    </>
  );
};

// Missing import for Sparkles component
const Sparkles = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1-1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default FileUploader;