import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Sparkles, ZoomIn } from "lucide-react";

export default function PollinatorDetector() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
        mode: 'cors',
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response from server:", data); // Debug log
      
      setResults({
        fileName: file.name,
        date: new Date().toISOString(),
        result: processPollinatorCounts(data.detections),
        annotatedImage: data.annotated_image, // Add the annotated image URL
        accuracy: data.accuracy ? (data.accuracy * 100).toFixed(2) + '%' : 'N/A',
        mostFrequent: data.presence || 'None'
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError(`Failed to process image: ${err.message}`);
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white flex flex-col items-center justify-center p-10 space-y-10 font-sans">
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
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center space-y-6 border border-yellow-300 backdrop-blur-md"
      >
        <div className="text-center">
          <p className="text-lg text-yellow-600 font-medium mb-2">Upload an image to detect pollinators</p>
          <Sparkles className="mx-auto text-yellow-500" size={36} />
        </div>

        <input
          type="file"
          accept="image/*"
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
            
            {/* Display the annotated image with bounding boxes */}
            {results.annotatedImage && (
              <div className="mb-6">
                <div className="overflow-hidden rounded-xl border-2 border-yellow-500 shadow-lg">
                  <img 
                    src={results.annotatedImage} 
                    alt="Annotated detection" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-yellow-600 text-center mt-2">
                  Image with detected pollinators and bounding boxes
                </p>
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