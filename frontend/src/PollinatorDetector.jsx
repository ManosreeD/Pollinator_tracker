import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Sparkles } from "lucide-react";

export default function PollinatorDetector() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(data);
    setFile(null);
    setLoading(false);
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

        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-4 bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-400 shadow-inner"
          >
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 text-center">📊 Detection Results</h2>
            <p className="text-sm text-yellow-800 mb-1"><strong>File:</strong> {results.fileName}</p>
            <p className="text-sm text-yellow-800 mb-4"><strong>Date:</strong> {new Date(results.date).toLocaleString()}</p>
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
          </motion.div>
        )}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-yellow-600 mt-10 text-center"
      >
        Built with 🧠 YOLOv5 & 🖥️ MERN Stack
      </motion.footer>
    </div>
  );
}