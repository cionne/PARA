# Deployment Guide

## Frontend (Hostinger) + Backend (Vercel)

### Backend Deployment on Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy backend:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add: `GEMINI_API_KEY` = `your_actual_api_key`

5. **Note your Vercel API URL:**
   - It will be something like: `https://your-project.vercel.app/api/chat`

### Frontend Deployment on Hostinger

1. **Update API URL in frontend:**
   - Replace `/api/chat` with your Vercel URL in `src/components/Chatbot.jsx`

2. **Build frontend:**
   ```bash
   npm run build
   ```

3. **Upload to Hostinger:**
   - Upload all files from `dist` folder to `public_html`

### Environment Variables

**Vercel (Backend):**
- `GEMINI_API_KEY` - Your Gemini API key

**Local Development:**
- `GEMINI_API_KEY` - Your Gemini API key (for server)
- `VITE_GEMINI_API_KEY` - Your Gemini API key (for client, if needed)
