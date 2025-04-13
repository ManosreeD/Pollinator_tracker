/**
 * Centralized API service for the Pollinator Tracker
 */

const API_URL = 'http://localhost:5000/api';

/**
 * Upload a file (image or video) for pollinator detection
 * @param {File} file - The file to upload
 * @returns {Promise} - The processed detection results
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return response.json();
};

/**
 * Fetch detection statistics
 * @returns {Promise} - Overall statistics
 */
export const fetchStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch statistics: ${errorText}`);
  }
  
  return response.json();
};

/**
 * Fetch past detections with pagination
 * @param {Object} options - Pagination options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.fileType - Filter by file type (image/video)
 * @returns {Promise} - Paginated detections and pagination metadata
 */
export const fetchDetections = async (options = {}) => {
  const { page = 1, limit = 10, fileType } = options;
  
  let url = `${API_URL}/detections?page=${page}&limit=${limit}`;
  if (fileType) {
    url += `&fileType=${fileType}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch detections: ${errorText}`);
  }
  
  return response.json();
};

/**
 * Fetch daily statistics
 * @param {Object} options - Query options
 * @param {string} options.startDate - Start date (YYYY-MM-DD)
 * @param {string} options.endDate - End date (YYYY-MM-DD)
 * @returns {Promise} - Daily statistics
 */
export const fetchDailyStats = async (options = {}) => {
  const { startDate, endDate } = options;
  
  let url = `${API_URL}/stats/daily`;
  const params = [];
  
  if (startDate) params.push(`startDate=${startDate}`);
  if (endDate) params.push(`endDate=${endDate}`);
  
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch daily statistics: ${errorText}`);
  }
  
  return response.json();
};

/**
 * Delete a detection by ID
 * @param {string} id - The detection ID to delete
 * @returns {Promise} - Deletion confirmation
 */
export const deleteDetection = async (id) => {
  const response = await fetch(`${API_URL}/detections/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete detection: ${errorText}`);
  }
  
  return response.json();
};