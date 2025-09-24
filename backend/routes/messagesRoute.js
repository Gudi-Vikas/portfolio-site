import express from 'express'
import { createMessage, deleteMessage, getMessages, updateMessageStatus } from '../controllers/messagesController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js'

const messagesRouter = express.Router()

// Public route
messagesRouter.get("", verifyAdmin, getMessages)
messagesRouter.post("/contact", createMessage)

// Admin routes (protected)
messagesRouter.delete("/:id", verifyAdmin, deleteMessage)
messagesRouter.patch("/:id/status", verifyAdmin, updateMessageStatus)

export default messagesRouter
