import express from 'express'
import fs from 'fs'
import skillModel from '../models/skillModel.js';


const skillAdd = async (req, res) => {
    try {
        const { category, name, link } = req.body;
        const skill = new skillModel({
            category,   
            name,
            link,
            image: req.file ? `/uploads/skills/${req.file.filename}` : null,
        })
        await skill.save(); 
        res.json({ success: true, message: "Skill Added" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "All fields are required." })
    }

}

const skillRemove = async (req, res) => {
    try {
        const id = req.body.id
        if (!id) {
            return res.json({ success: false, message: "Skill ID is required" })
        }
        
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res.json({ success: false, message: "Skill not found" })
        }
        
        // Delete the image file if it exists
        if (skill.image) {
            const imagePath = `.${skill.image}`;
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (fileError) {
                console.log("Error deleting image file:", fileError);
                // Continue with skill deletion even if image deletion fails
            }
        }
        
        await skillModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Skill Removed" })

    } catch (error) {
        console.log("Error removing skill:", error);
        res.json({ success: false, message: "Error removing skill" })

    }

}

const allSkills =async (req, res) => {
    try {
        const skills = await skillModel.find({});
        res.json({success:true,data:skills})
    } catch (error) {
        console.error(error);
        res.json({success:false,data:error})
        
    }

}
export { skillAdd, skillRemove, allSkills }