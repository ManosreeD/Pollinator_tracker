import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function ResultsDisplay({ results }) {
  const [activeTab, setActiveTab] = useState("overview");

  // If there are no results, don't render anything
  if (!results) return null;

  // Ensure pollinatorCounts exists with a fallback to empty object
  const pollinatorCounts = results.pollinatorCounts || {};
  
  const renderOverview = () => (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden">
        {results.annotatedImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={results.annotatedImage}
            alt="Analyzed image with detections"
            className="w-full object-cover rounded-lg border border-yellow-300 shadow-md"
          />
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-center">
            No annotated image available
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ResultCard 
          title="Pollinator Presence" 
          value={results.presence || "None"} 
        />
        <ResultCard 
          title="Number Detected" 
          value={results.count || 0} 
        />
        <ResultCard 
          title="Confidence" 
          value={`${Math.round((results.accuracy || 0) * 100)}%`} 
        />
        <ResultCard 
          title="File Type" 
          value={results.isVideo ? "Video" : "Image"} 
        />
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-yellow-800">Detection Details</h3>
      
      {results.detections && results.detections.length > 0 ? (
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-yellow-200">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Confidence</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-yellow-100">
              {results.detections.map((detection, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{detection.class}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{Math.round(detection.confidence * 100)}%</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {detection.bbox ? 
                      `[${detection.bbox.map(b => Math.round(b)).join(', ')}]` : 
                      'N/A'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No detailed detection data available</p>
      )}
      
      <h3 className="text-lg font-medium text-yellow-800 mt-6">Pollinator Distribution</h3>
      <div className="bg-yellow-50 p-4 rounded-lg">
        {Object.keys(pollinatorCounts).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(pollinatorCounts).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-yellow-800 font-medium">{type}</span>
                <div className="flex items-center">
                  <div className="bg-yellow-200 h-4 rounded-full overflow-hidden" style={{ width: `${Math.min(count * 20, 100)}px` }}/>
                  <span className="ml-2 text-yellow-700">{count}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-yellow-700 text-center">No pollinator distribution data available</p>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-6"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-yellow-50">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="details"
            className="data-[state=active]:bg-white"
          >
            Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          {renderOverview()}
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          {renderDetails()}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

const ResultCard = ({ title, value }) => (
  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
    <h3 className="text-sm font-medium text-yellow-700">{title}</h3>
    <p className="text-xl font-bold text-yellow-900 mt-1">{value}</p>
  </div>
);