# Notes Manager

A full-stack notes application built with React and Node.js.

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Sarthak2845/Notes-Manager
cd Notes-Manager
```

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   Or for deployed backend:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication (register/login)
- Create, read, update, delete notes
- Search functionality
- Responsive design

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT tokens