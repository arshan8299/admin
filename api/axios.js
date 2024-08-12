import axios from 'axios';

// Check if the environment variable is correctly loaded
if (process.env.NODE_ENV === 'development') {
  console.log('Base URL:', process.env.EXPO_PUBLIC_BASE_URL);
}

// Set up the base URL from the environment variable
const baseURL = process.env.EXPO_PUBLIC_BASE_URL  // Fallback URL

// Create a default Axios instance
const axiosInstance = axios.create({
  baseURL,
});

// Create a private Axios instance with additional configuration
const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Export both instances
export { axiosInstance, axiosPrivate };

