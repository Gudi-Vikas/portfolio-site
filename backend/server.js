import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
import messagesRouter from "./routes/messagesRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Basic middleware
app.use(express.json());

// CORS with env-configurable origins and proper headers
const corsOrigins = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser or same-origin
      if (corsOrigins.length === 0 || corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicitly handle preflight
app.options("*", cors());

// Static files (avoid stale cached images)
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    },
  })
);

// DB
connectDB();

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/skills', skillRouter);
app.use('/api/projects', projectRouter);
app.use('/api/messages', messagesRouter);

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
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
