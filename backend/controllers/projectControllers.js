import express from 'express'
import projectModel from '../models/projectModel.js';
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
const projectAddHandler = async (req, res) => {
    try {
        const { title, description, technologies, started, completed, repo, demo } = req.body;

        // Create new project document
        const project = new projectModel({
            title,
            description,
            technologies: JSON.parse(technologies), // convert string -> array
            started,
            repo,
            image: `/uploads/projects/${req.file.filename}`
        });

        // Add optional fields only if provided
        if (completed) { project.completed = completed };
        if (demo) { project.demo = demo };

        await project.save();
        res.json({ success: true, message: "Project Added" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "All fields are required." });
    }
}

const projectEditHandler = async (req, res) => {

    try {
        const { id, ...updateData } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Project ID is required" });
        }

        // Find project first (to know old image path)
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Handle technologies array
        if (updateData.technologies) {
            try {
                updateData.technologies = JSON.parse(updateData.technologies);
            } catch (err) {
                return res.status(400).json({ success: false, message: "Invalid technologies format" });
            }
        }

        // delete old image if it exists and new image is uploaded
        if (req.file) {
            if (project.image) {
                const oldImagePath = path.join(process.cwd(), project.image);//process.cwd returns working directory of nodejs
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/projects/${req.file.filename}`;
        }

        const updatedProject = await projectModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        
        if (!updatedProject) {
            return res.status(500).json({ success: false, message: "Failed to update project" });
        }
        
        res.json({ success: true, message: "Project Updated Successfully", data: updatedProject });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error in updating project" })
    }
}

const projectListHandler = async (req, res) => {
    try {
        const allProjects = await projectModel.find({})
        res.json({ success: true, data: allProjects });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error in sending data" })
    }
}

const projectRemoveHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Project ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid project id" });
        }

        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Delete the image file
        if (project.image) {
            const ImagePath = path.join(process.cwd(), project.image);
            if (fs.existsSync(ImagePath)) {
                fs.unlinkSync(ImagePath);
            }
        }

        await projectModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Project deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error in deleting project" })
    }
}

const findDataById = async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({ success: false, message: "No id provided" });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: "Invalid project id" });
            }

            const project = await projectModel.findById(id);
            if (!project) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }
            res.json({ success: true, data: project })

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Project Not Found" })

        }
    }

export { projectAddHandler, projectEditHandler, projectListHandler, projectRemoveHandler, findDataById }