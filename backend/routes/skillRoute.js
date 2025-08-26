import express from 'express'
import { allSkills, skillAdd, skillRemove } from '../controllers/skillControllers.js';
import multer from 'multer';
import makeUploader from '../middleware/uploadFileMiddleware.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const skillRouter = express.Router();
const uploadSkills = makeUploader("skills")

// Public route
skillRouter.get("/allskills", allSkills)

// Protected admin routes
skillRouter.post("/add", verifyAdminToken, uploadSkills.single("image"), skillAdd)
skillRouter.post("/remove", verifyAdminToken, skillRemove)

export default skillRouter   
