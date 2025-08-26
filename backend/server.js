import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
import messagesRouter from "./routes/messagesRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Basic middleware
app.use(express.json());
app.use(cors());

// Static files
app.use("/uploads", express.static("uploads"));

// DB
connectDB();

// public routes
app.use("/api/skills", skillRouter);
app.use("/api/projects", projectRouter);
app.use("/api", messagesRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
