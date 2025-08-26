import express from 'express'
import { allSkills, skillAdd, skillRemove } from '../controllers/skillControllers.js';
import multer from 'multer';
import makeUploader from '../middleware/uploadFileMiddleware.js';

const skillRouter = express.Router();
const uploadSkills = makeUploader("skills")

// Public route
skillRouter.get("/allskills", allSkills)

// Admin routes
skillRouter.post("/add", uploadSkills.single("image"), skillAdd)
skillRouter.post("/remove", skillRemove)

export default skillRouter   
