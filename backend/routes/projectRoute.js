import express, { Router } from 'express'
import { findDataById, projectAddHandler, projectEditHandler, projectListHandler, projectRemoveHandler } from '../controllers/projectControllers.js';
import makeUploader from '../middleware/uploadFileMiddleware.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const projectRouter = express.Router();

const projectUploads = makeUploader("/projects")

// Public routes
projectRouter.get("/allprojects", projectListHandler)
projectRouter.get("/project/:id", findDataById)

// Protected admin routes
projectRouter.post("/add", verifyAdminToken, projectUploads.single("image"), projectAddHandler)
projectRouter.put("/edit", verifyAdminToken, projectUploads.single("image"), projectEditHandler)
projectRouter.delete("/project/:id", verifyAdminToken, projectRemoveHandler)

export default projectRouter;
