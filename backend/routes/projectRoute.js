import express, { Router } from 'express'
import { findDataById, projectAddHandler, projectEditHandler, projectListHandler, projectRemoveHandler } from '../controllers/projectControllers.js';
import makeUploader from '../middleware/uploadFileMiddleware.js';

const projectRouter = express.Router();

const projectUploads = makeUploader("/projects")

// Public routes
projectRouter.get("/allprojects", projectListHandler)
projectRouter.get("/project/:id", findDataById)

// Public admin routes (auth removed)
projectRouter.post("/add", projectUploads.single("image"), projectAddHandler)
projectRouter.put("/edit", projectUploads.single("image"), projectEditHandler)
projectRouter.delete("/project/:id", projectRemoveHandler)

export default projectRouter;
