const axios = require('axios');

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

const makeApiRequest = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ApiError(
        error.response.data.message || 'Weather API request failed',
        error.response.status
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new ApiError('No response from weather API', 503);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new ApiError('Error setting up weather API request', 500);
    }
  }
};

module.exports = {
  makeApiRequest,
  ApiError,
}; 