import messageModel from "../models/messagesModel.js";

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = async (req, res) => {
    try {
        // Sort by createdAt in descending order (newest first)
        const messages = await messageModel.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new message
// @route   POST /api/contact
// @access  Public
export const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    try {
        const newMessage = new messageModel({
            name,
            email,
            subject,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update message status (read/unread)
// @route   PATCH /api/messages/:id/status
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
    const { isRead, isArchived } = req.body;
    
    try {
        const message = await messageModel.findById(req.params.id);

        if (message) {
            if (typeof isRead === 'boolean') {
                message.isRead = isRead;
            }
            if (typeof isArchived === 'boolean') {
                message.isArchived = isArchived;
            }
            
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.findById(req.params.id);

        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
