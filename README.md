# Pet Activity Tracker

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev)
[![Express](https://img.shields.io/badge/Backend-Express-green?logo=express)](https://expressjs.com)
[![Gemini API](https://img.shields.io/badge/AI-Gemini-yellow?logo=google)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Render](https://img.shields.io/badge/Deploy-Render-blue?logo=render)](https://render.com)

## Stack Overview
| Layer     | Tech         | Hosting  |
|-----------|--------------|----------|
| Frontend  | React        | Vercel   |
| Backend   | Express      | Render   |
| AI        | Gemini API   | Render   |

## Quick Start
1. Clone repo & install dependencies:
   ```bash
   npm install
   ```
2. Set API base URL in `frontend/.env`:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
   ```
3. Start frontend:
   ```bash
   npm start
   ```

## Frontend Environment Setup
1. In `frontend/.env`, add:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
   ```
2. On Vercel, add the same environment variable in the dashboard for production builds.

## Backend Environment Setup
1. In `backend/.env`, add:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   PORT=5000
   ```
2. On Render, add `GEMINI_API_KEY` in the dashboard. You do not need to set `PORT`—Render sets it automatically.

## Trade-offs
- No database: activities are not persisted.
- Secrets managed via environment variables.
- Mobile-first UI, but no authentication or persistent storage for simplicity.

---
[Frontend (Vercel)](https://vercel.com) | [Backend (Render)](https://render.com) | [Gemini API](https://ai.google.dev)
