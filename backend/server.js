// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
import messagesRouter from "./routes/messagesRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// SECURITY + parsing
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// simple rate limiter
app.use(
  rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000,
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 200,
  })
);

// CORS - configurable origins
app.use(
  cors({
    origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN?.split(',') || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// static uploads - serve with proper headers
app.use("/uploads", express.static("uploads", {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// DB
connectDB();

// public routes
app.use("/api/skills", skillRouter);
app.use("/api/projects", projectRouter);
app.use("/api", messagesRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
