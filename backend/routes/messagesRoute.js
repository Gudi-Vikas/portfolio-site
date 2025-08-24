import express from 'express'
import { createMessage, deleteMessage, getMessages, updateMessageStatus } from '../controllers/messagesController.js'

const messagesRouter = express.Router()

messagesRouter.get("/messages",getMessages)
messagesRouter.post("/contact",createMessage)
messagesRouter.delete("/messages/:id", deleteMessage)
messagesRouter.patch("/messages/:id/status", updateMessageStatus)

export default messagesRouter