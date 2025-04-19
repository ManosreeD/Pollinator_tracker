import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Sparkles, ZoomIn } from "lucide-react";

export default function PollinatorDetector() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setRawResponse(null);
  
    const formData = new FormData();
    formData.append("file", file);
  
    const isVideo = file.type.startsWith("video/");
    const uploadURL = isVideo
      ? "http://localhost:5000/upload-video"
      : "http://localhost:5000/upload";
  
    try {
      const res = await fetch(uploadURL, {
        method: "POST",
        body: formData,
        mode: "cors",
      });
  
      if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
  
      const data = await res.json();
      console.log("Server response:", data);
      setRawResponse(data);
  
      if (isVideo) {
        setResults({
          fileName: file.name,
          date: new Date().toISOString(),
          result: { [data.presence]: data.count },  // This shows up under "Species Detected"
          annotatedVideo: data.annotated_video,
          originalVideo: data.original_video,
          mostFrequent: data.frequency || 'None',
          accuracy: data.video_metrics?.avg_confidence ? 
                   (data.video_metrics.avg_confidence * 100).toFixed(2) + '%' : 'N/A',
          videoMetrics: data.video_metrics || {},
        });
      }
       else {
        setResults({
          fileName: file.name,
          date: new Date().toISOString(),
          result: processPollinatorCounts(data.detections),
          annotatedImage: data.annotated_image,
          originalImage: data.original_image,
          accuracy: data.accuracy ? (data.accuracy * 100).toFixed(2) + '%' : 'N/A',
          mostFrequent: data.presence || 'None',
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(`Failed to process file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const processPollinatorCounts = (detections) => {
    const counts = {};
    if (detections && Array.isArray(detections)) {
      detections.forEach(item => {
        const species = item.class;
        counts[species] = (counts[species] || 0) + 1;
      });
    }
    return counts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white flex flex-col items-center p-10 space-y-10 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-yellow-700 drop-shadow-xl tracking-tight"
      >
        🐝 Pollinator Detector
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center space-y-6 border border-yellow-300 backdrop-blur-md"
      >
        {/* Removing the navigation links since they're now in the navbar */}
        
        <div className="text-center">
          <p className="text-lg text-yellow-600 font-medium mb-2">Upload an image or video to detect pollinators</p>
          <Sparkles className="mx-auto text-yellow-500" size={36} />
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-800 border border-yellow-300 rounded-xl cursor-pointer bg-yellow-100 hover:bg-yellow-200 focus:outline-none transition-all duration-150 p-2"
        />

        <button
          disabled={!file || loading}
          onClick={handleUpload}
          className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />}
          {loading ? "Processing..." : "Upload & Detect"}
        </button>

        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-4 bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-400 shadow-inner"
          >
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 text-center">📊 Detection Results</h2>

            {/* Original Media Section */}
            {(results.originalImage || results.originalVideo) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">Original Upload:</h3>
                <div className="overflow-hidden rounded-xl border-2 border-yellow-500 shadow-lg">
                  {results.originalImage && (
                    <img 
                      src={results.originalImage} 
                      alt="Original uploaded image" 
                      className="w-full h-auto object-contain"
                    />
                  )}
                  {results.originalVideo && (
                    <video 
                      src={results.originalVideo} 
                      controls 
                      className="w-full h-auto"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Annotated Media Section */}
            {(results.annotatedImage || results.annotatedVideo) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">Annotated Result:</h3>
                <div className="overflow-hidden rounded-xl border-2 border-yellow-500 shadow-lg">
                  {results.annotatedImage && (
                    <img 
                      src={results.annotatedImage} 
                      alt="Annotated detection" 
                      className="w-full h-auto object-contain"
                    />
                  )}
                  {results.annotatedVideo && (
                    <video 
                      src={results.annotatedVideo} 
                      controls 
                      className="w-full h-auto"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-yellow-800"><strong>Most Common:</strong> {results.mostFrequent}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-yellow-800"><strong>Accuracy:</strong> {results.accuracy}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-yellow-800"><strong>File:</strong> {results.fileName}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-yellow-800"><strong>Date:</strong> {new Date(results.date).toLocaleString()}</p>
              </div>
            </div>
            
            {/* Video-specific metrics */}
            {results.videoMetrics && Object.keys(results.videoMetrics).length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">Video Metrics:</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(results.videoMetrics).map(([key, value], index) => (
                      <p key={index} className="text-sm text-yellow-800">
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Species Detected:</h3>
            {Object.keys(results.result).length > 0 ? (
              <ul className="space-y-2">
                {Object.entries(results.result).map(([species, count], index) => (
                  <li
                    key={index}
                    className="bg-white rounded-xl px-6 py-3 shadow-md border border-yellow-300 text-yellow-900 text-sm hover:bg-yellow-100 transition"
                  >
                    <strong>{species}:</strong> {count} spotted
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-yellow-700">No pollinators detected in this image.</p>
            )}

            {/* Raw API Response Section */}
            {rawResponse && (
              <div className="mt-6">
                <details className="text-sm">
                  <summary className="cursor-pointer text-yellow-700 font-semibold hover:text-yellow-800">Show Raw API Response</summary>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg overflow-auto max-h-64">
                    <pre className="text-xs">{JSON.stringify(rawResponse, null, 2)}</pre>
                  </div>
                </details>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-yellow-600 mt-10 text-center"
      >
        Built with 🧠 YOLOv5 & 🖥️ React + Flask
      </motion.footer>
    </div>
  );
}