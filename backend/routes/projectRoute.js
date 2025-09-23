import express, { Router } from 'express'
import { findDataById, projectAddHandler, projectEditHandler, projectListHandler, projectRemoveHandler } from '../controllers/projectControllers.js';
import makeUploader from '../middleware/uploadFileMiddleware.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const projectRouter = express.Router();

const projectUploads = makeUploader("projects")

// Public routes
projectRouter.get("/allprojects", projectListHandler)
projectRouter.get("/project/:id", findDataById)

// Admin routes (protected)
projectRouter.post("/add", verifyAdmin, projectUploads.single("image"), projectAddHandler)
projectRouter.put("/edit", verifyAdmin, projectUploads.single("image"), projectEditHandler)
projectRouter.delete("/project/:id", verifyAdmin, projectRemoveHandler)

export default projectRouter;
