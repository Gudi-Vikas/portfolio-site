import express from 'express'
import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  started: { type: String, required: true },
  completed: { type: String },
  repo: { type: String, required: true },
  demo: { type: String }
});

const projectModel = mongoose.models.project || mongoose.model("project",projectSchema)

export default projectModel