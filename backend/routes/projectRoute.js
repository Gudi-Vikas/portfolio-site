import express, { Router } from 'express'
import { findDataById, projectAddHandler, projectEditHandler, projectListHandler, projectRemoveHandler } from '../controllers/projectControllers.js';
import makeUploader from '../middleware/uploadFileMiddleware.js';


const projectRouter = express.Router();


const projectUploads = makeUploader("/projects")

// CRUD operations
projectRouter.post("/add", projectUploads.single("image"), projectAddHandler)
projectRouter.put("/edit", projectUploads.single("image"), projectEditHandler)
projectRouter.get("/allprojects", projectListHandler)

// Specific project operations
projectRouter.get("/project/:id", findDataById)
projectRouter.delete("/project/:id", projectRemoveHandler)

export default projectRouter;
