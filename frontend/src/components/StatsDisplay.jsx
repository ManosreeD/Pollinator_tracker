import { motion } from 'framer-motion';
import { Loader2, BarChart3, Film, Image } from 'lucide-react';

/**
 * Component to display pollinator detection statistics
 */
const StatsDisplay = ({ stats, pastDetections, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-yellow-500" size={36} />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-10">
        <p className="text-yellow-600 text-lg">No statistics available yet.</p>
        <p className="text-yellow-500 mt-2">Upload images or videos to generate stats.</p>
      </div>
    );
  }

  // Calculate percentages for the chart
  const totalScans = stats.videoVsImageCounts.image + stats.videoVsImageCounts.video;
  const imagePercentage = totalScans ? Math.round((stats.videoVsImageCounts.image / totalScans) * 100) : 0;
  const videoPercentage = 100 - imagePercentage;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-md border border-yellow-200">
        <h3 className="text-lg font-bold text-yellow-700 mb-4">Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-sm text-yellow-600">Total Scans</p>
            <p className="text-2xl font-bold text-yellow-800">{stats.totalScans}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-sm text-yellow-600">Total Detections</p>
            <p className="text-2xl font-bold text-yellow-800">{stats.totalDetections}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center flex flex-col items-center">
            <div className="flex items-center">
              <Image size={16} className="text-yellow-700 mr-1" />
              <p className="text-sm text-yellow-600">Image Scans</p>
            </div>
            <p className="text-2xl font-bold text-yellow-800">{stats.videoVsImageCounts.image}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center flex flex-col items-center">
            <div className="flex items-center">
              <Film size={16} className="text-yellow-700 mr-1" />
              <p className="text-sm text-yellow-600">Video Scans</p>
            </div>
            <p className="text-2xl font-bold text-yellow-800">{stats.videoVsImageCounts.video}</p>
          </div>
        </div>

        {/* Media Type Distribution Chart */}
        {totalScans > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium text-yellow-700 mb-2">Media Type Distribution</p>
            <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 text-xs flex items-center justify-center text-white"
                style={{ width: `${imagePercentage}%` }}
              >
                {imagePercentage > 10 && `${imagePercentage}% Images`}
              </div>
              <div 
                className="h-full bg-yellow-700 text-xs flex items-center justify-center text-white"
                style={{ width: `${videoPercentage}%`, marginLeft: `${imagePercentage}%` }}
              >
                {videoPercentage > 10 && `${videoPercentage}% Videos`}
              </div>
            </div>
            <div className="flex justify-between text-xs text-yellow-600 mt-1">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
                <span>Images</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-700 rounded-sm mr-1"></div>
                <span>Videos</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-5 shadow-md border border-yellow-200">
        <h3 className="text-lg font-bold text-yellow-700 mb-4">Pollinator Types</h3>
        <ul className="space-y-2">
          {Object.entries(stats.mostFrequentPollinators).length > 0 ? (
            Object.entries(stats.mostFrequentPollinators).map(([name, count], idx) => (
              <li key={idx} className="flex justify-between items-center p-2 hover:bg-yellow-50 rounded">
                <span className="font-medium">{name}</span>
                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 rounded px-2 py-1 text-sm">
                    {count} detected
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-yellow-600 text-center">No pollinator data available yet</p>
          )}
        </ul>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-md border border-yellow-200">
        <h3 className="text-lg font-bold text-yellow-700 mb-4">Recent Detections</h3>
        {pastDetections && pastDetections.length > 0 ? (
          <div className="space-y-3">
            {pastDetections.slice(0, 5).map((detection) => (
              <div 
                key={detection._id} 
                className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    {detection.fileType === 'image' ? (
                      <Image size={16} className="text-yellow-700" />
                    ) : (
                      <Film size={16} className="text-yellow-700" />
                    )}
                    <p className="font-medium text-yellow-800">
                      {detection.originalFileName || detection.fileName}
                    </p>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    {new Date(detection.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-800 font-medium">
                    {detection.stats.totalCount} detections
                  </p>
                  <p className="text-xs text-yellow-600">
                    Most common: {detection.stats.mostFrequent || 'None'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-yellow-600 text-center">No detections yet</p>
        )}
      </div>
    </div>
  );
};

export default StatsDisplay;