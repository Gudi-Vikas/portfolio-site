import messageModel from "../models/messagesModel.js";

export const getMessages = async (req, res) => {
    try {
        const { isArchived } = req.query;
        const filter = {};
        
        // Add filter for archived status if provided
        if (isArchived === 'true') {
            filter.isArchived = true;
        } else if (isArchived === 'false') {
            filter.isArchived = false;
        }
        
        const messages = await messageModel.find(filter).sort({ createdAt: -1 });
        
        res.status(200).json({ 
            success: true, 
            data: messages,
            count: messages.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch messages',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill out all required fields.'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    try {
        const newMessage = new messageModel({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim()
        });

        await newMessage.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const updateMessageStatus = async (req, res) => {
    const { id } = req.params;
    const { isRead, isArchived } = req.body;
    
    if (typeof isRead !== 'boolean' && typeof isArchived !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'At least one status field is required.'
        });
    }
    
    try {
        const updates = {};
        if (typeof isRead === 'boolean') updates.isRead = isRead;
        if (typeof isArchived === 'boolean') updates.isArchived = isArchived;
        
        const updatedMessage = await messageModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        
        if (!updatedMessage) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Message status updated'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update message status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedMessage = await messageModel.findByIdAndDelete(id);
        
        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Message deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete message',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
