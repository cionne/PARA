// API configuration for different environments
const API_CONFIG = {
  // For production - replace with your Vercel URL after deployment
  production: 'https://para-landing-mqzbkjmc5-cionnes-projects.vercel.app',
  
  // For development - uses local Express server
  development: '/api/chat',
  
  // For local testing with Vercel backend
  // development: 'https://your-project-name.vercel.app/api/chat'
};

// Get current environment
const isProduction = import.meta.env.PROD;

// Get API URL based on environment
export const getApiUrl = () => {
  // Check if there's a custom API URL in environment variables
  const customApiUrl = import.meta.env.VITE_API_URL;
  if (customApiUrl) {
    return customApiUrl;
  }
  
  // Use default URLs based on environment
  return isProduction ? API_CONFIG.production : API_CONFIG.development;
};

export default getApiUrl;
