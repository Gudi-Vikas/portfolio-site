import express from 'express'
import { allSkills, skillAdd, skillRemove } from '../controllers/skillControllers.js';
import multer from 'multer';
import makeUploader from '../middleware/uploadFileMiddleware.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const skillRouter = express.Router();
const uploadSkills = makeUploader("skills")

// Public route
skillRouter.get("/allskills", allSkills)

// Admin routes (protected)
skillRouter.post("/add", verifyAdmin, uploadSkills.single("image"), skillAdd)
skillRouter.post("/remove", verifyAdmin, skillRemove)

export default skillRouter   
