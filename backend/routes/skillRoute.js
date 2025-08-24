import express from 'express'
import { allSkills, skillAdd, skillRemove } from '../controllers/skillControllers.js';
import multer from 'multer';
import makeUploader from '../middleware/uploadFileMiddleware.js';


const skillRouter = express.Router();
const uploadSkills = makeUploader("skills")

skillRouter.post("/add",uploadSkills.single("image"),skillAdd)
skillRouter.post("/remove", skillRemove)
skillRouter.get("/allskills", allSkills)

export default skillRouter   