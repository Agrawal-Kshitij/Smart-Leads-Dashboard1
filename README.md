# Smart Leads Dashboard

A full-stack MERN assignment for lead management with JWT authentication, role-based access, filters, pagination, CSV export, and a responsive dashboard UI.

## Structure

- `backend/` - Express API with TypeScript and MongoDB
- `frontend/` - React + TypeScript + Tailwind dashboard
- `docker-compose.yml` - Local environment with MongoDB

## Features

- User Authentication (JWT)
- Lead Management
- Dashboard Analytics
- Search and Filters
- Responsive UI
- Protected Routes
- REST API Integration

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Run locally

1. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. Start backend:
   - `cd backend && npm run dev`
3. Start frontend:
   - `cd frontend && npm run dev`

## .env.example 

PORT=5000
MONGO_URI=mongodb://mongodb:27017/smartleads
JWT_SECRET=SuperSecretJwtKey1234
JWT_EXPIRES_IN=7d


## Docker

`docker-compose up --build`

## Notes

- Backend uses JWT authentication and RBAC for `admin` and `sales` roles.
- Leads can be filtered by status/source, searched by text, sorted, paginated, and exported to CSV.

## Deployment

Frontend: Render
Backend: Render
Database: MongoDB Atlas

## Author

Kshitij Agrawal
