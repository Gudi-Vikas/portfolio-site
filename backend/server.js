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

// public routes
app.use("/api/auth", authRouter);
app.use("/api/skills", skillRouter);
app.use("/api/projects", projectRouter);
app.use("/api", messagesRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
