# 📸 Photo Gallery App

A full-stack photo gallery application built with React, Node.js, and PostgreSQL.

## 🌐 Live Demo
- **Frontend:** [https://photo-gallery-six-eta.vercel.app/]
- **Backend:** https://photo-gallery-backend-l605.onrender.com

## ✨ Features
- 📁 Create, rename, and delete folders
- 🖼️ Upload multiple images to folders
- 🔄 Replace existing images
- 🗑️ Delete images
- 👁️ Image viewer with prev/next navigation

## 🛠️ Tech Stack
- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express.js, Multer
- **Database:** PostgreSQL (Neon)
- **Hosting:** Vercel (frontend), Render (backend)

## 🚀 Getting Started

### Backend
```bash
cd server
npm install
node server.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## 📝 Environment Variables
Create a `.env` file in the `server` folder:
```
DATABASE_URL=your_neon_connection_string
```
