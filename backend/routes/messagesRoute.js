import express from 'express';
import { 
  createMessage, 
  deleteMessage, 
  getMessages, 
  updateMessageStatus 
} from '../controllers/messagesController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getMessages);
router.post('/contact', createMessage);

// Admin routes (protected)
router.delete('/:id', verifyAdmin, deleteMessage);
router.patch('/:id/status', verifyAdmin, updateMessageStatus);

// Handle invalid routes
const handleInvalidRoute = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};

// Handle invalid methods and routes
['get', 'post', 'put', 'patch', 'delete', 'options'].forEach(method => {
  if (typeof router[method] === 'function' && method !== 'get' && method !== 'post') {
    router[method]('/', handleInvalidRoute);
  }
});

export default router;
