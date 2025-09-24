import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
import messagesRouter from "./routes/messagesRoute.js";
import authRouter from "./routes/authRoute.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Static files
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    },
  })
);

// Connect to database
connectDB();

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/skills', skillRouter);
app.use('/api/projects', projectRouter);
app.use('/api/messages', messagesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});
