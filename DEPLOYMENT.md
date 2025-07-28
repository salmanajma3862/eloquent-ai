# Deployment Guide

This guide covers deploying the Eloquent AI application to production using Vercel (frontend) and Render (backend).

## Frontend Deployment (Vercel)

### 1. Environment Variables
Set the following environment variables in your Vercel dashboard:

```
VITE_AUTH_GOOGLE_ID=your-google-oauth-client-id
VITE_API_BASE_URL=https://your-backend-domain.com
```

### 2. Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Backend Deployment (Render)

### 1. Environment Variables
Set the following environment variables in your Render dashboard:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
CLOUDFLARE_R2_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
CLOUDFLARE_R2_REGION=auto
DEEPGRAM_API_KEY=your-deepgram-api-key
ELEVENLABS_API_KEY=your-elevenlabs-api-key
```

### 2. Build Settings
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

## Development Setup

### Frontend (.env)
```
VITE_AUTH_GOOGLE_ID=your-google-oauth-client-id
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (.env)
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
# FRONTEND_URL is optional for development (defaults to localhost:5173)
```

## Important Notes

1. **CORS Configuration**: The backend automatically allows `localhost:5173` for development and uses `FRONTEND_URL` for production.

2. **API Base URL**: The frontend automatically uses `localhost:5000` for development and `VITE_API_BASE_URL` for production.

3. **Security**: Never commit actual environment variables to version control. Use the `.env.example` files as templates.

4. **Domain Setup**: Make sure to update both `VITE_API_BASE_URL` and `FRONTEND_URL` with your actual production domains after deployment.
