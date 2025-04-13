import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Loader2 } from "lucide-react";
import FileUploader from "./components/FileUploader";
import ResultsDisplay from "./components/ResultsDisplay";
import StatsDisplay from "./components/StatsDisplay";
import { uploadFile, fetchStats, fetchDetections } from "./api";

export default function PollinatorDetector() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [stats, setStats] = useState(null);
  const [pastDetections, setPastDetections] = useState([]);
  const [activeTab, setActiveTab] = useState("detector");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch statistics when the stats tab is opened
    if (activeTab === "stats") {
      fetchStatsData();
      fetchPastDetectionsData();
    }
  }, [activeTab]);

  const fetchStatsData = async () => {
    try {
      setError(null);
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setError("Failed to fetch statistics. Please try again later.");
    }
  };

  const fetchPastDetectionsData = async () => {
    try {
      setError(null);
      const data = await fetchDetections();
      setPastDetections(data.detections || []);
    } catch (err) {
      console.error("Failed to fetch past detections:", err);
      setError("Failed to fetch detection history. Please try again later.");
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await uploadFile(file);
      setResults(data);
      // Refresh stats after successful detection
      await fetchStatsData();
    } catch (error) {
      console.error("Error during upload:", error);
      setError(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderTabs = () => (
    <div className="flex rounded-lg bg-yellow-100 p-1 mb-6">
      <button
        onClick={() => setActiveTab("detector")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
          activeTab === "detector"
            ? "bg-white text-yellow-700 shadow"
            : "text-yellow-900"
        }`}
      >
        Detector
      </button>
      <button
        onClick={() => setActiveTab("stats")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
          activeTab === "stats"
            ? "bg-white text-yellow-700 shadow"
            : "text-yellow-900"
        }`}
      >
        Statistics
      </button>
    </div>
  );

  const renderError = () => {
    if (!error) return null;

    return (
      <div className="bg-red-50 border border-red-300 text-red-800 rounded-lg p-4 mb-4">
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
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
        {renderTabs()}
        {renderError()}

        {activeTab === "detector" ? (
          <>
            <FileUploader 
              onUpload={handleUpload} 
              loading={loading} 
            />
            <ResultsDisplay results={results} />
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="text-yellow-600" size={24} />
              <h2 className="text-xl font-bold text-yellow-700 ml-2">
                Pollinator Statistics
              </h2>
            </div>
            <StatsDisplay 
              stats={stats} 
              pastDetections={pastDetections} 
              loading={loading} 
            />
          </div>
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