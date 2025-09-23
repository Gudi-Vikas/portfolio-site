import messageModel from "../models/messagesModel.js";

export const getMessages = async (req, res) => {
    try {
        // Sort by createdAt in descending order (newest first)
        const messages = await messageModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Please fill out all fields.' });
    }

    try {
        const newMessage = new messageModel({
            name,
            email,
            subject,
            message
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

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
            res.json({ success: true, data: updatedMessage });
        } else {
            res.status(404).json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error updating message status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.findById(req.params.id);

        if (message) {
            await message.deleteOne();
            res.json({ success: true, message: 'Message removed' });
        } else {
            res.status(404).json({ success: false, message: 'Message not found' });
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
