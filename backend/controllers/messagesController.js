import messageModel from "../models/messagesModel.js";

export const getMessages = async (req, res) => {
    try {
        // Get query parameters for filtering
        const { isArchived } = req.query;
        const filter = {};
        
        // Add filter for archived status if provided
        if (isArchived === 'true') {
            filter.isArchived = true;
        } else if (isArchived === 'false') {
            filter.isArchived = false;
        }
        
        // Sort by createdAt in descending order (newest first)
        const messages = await messageModel.find(filter).sort({ createdAt: -1 });
        
        res.status(200).json({ 
            success: true, 
            data: messages,
            count: messages.length
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch messages',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Input validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill out all required fields.',
            fields: { name: !name, email: !email, subject: !subject, message: !message }
        });
    }

    // Email validation
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
            message: message.trim(),
            isRead: false,
            isArchived: false
        });

        await newMessage.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            data: {
                id: newMessage._id,
                name: newMessage.name,
                email: newMessage.email,
                subject: newMessage.subject
            }
        });
    } catch (error) {
        console.error('Error creating message:', error);
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
    
    // Validate that at least one field is being updated
    if (typeof isRead !== 'boolean' && typeof isArchived !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'At least one valid status field (isRead or isArchived) is required.'
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
            message: 'Message updated successfully',
            data: updatedMessage 
        });
    } catch (error) {
        console.error('Error updating message status:', error);
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
            message: 'Message deleted successfully',
            data: { id: deletedMessage._id }
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete message',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
