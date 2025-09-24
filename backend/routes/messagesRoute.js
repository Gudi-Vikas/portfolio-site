import express from 'express';
import { 
  createMessage, 
  deleteMessage, 
  getMessages, 
  updateMessageStatus 
} from '../controllers/messagesController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('Initializing message routes...');

// Public routes
router.get('/', (req, res, next) => {
  console.log('GET /api/messages/ route hit');
  return getMessages(req, res, next);
});

router.post('/contact', (req, res, next) => {
  console.log('POST /api/messages/contact route hit');
  return createMessage(req, res, next);
});

// Admin routes (protected)
router.delete('/:id', verifyAdmin, (req, res, next) => {
  console.log(`DELETE /api/messages/${req.params.id} route hit`);
  return deleteMessage(req, res, next);
});

router.patch('/:id/status', verifyAdmin, (req, res, next) => {
  console.log(`PATCH /api/messages/${req.params.id}/status route hit`);
  return updateMessageStatus(req, res, next);
});

// Handle specific invalid routes instead of using catch-all
// This avoids issues with path-to-regexp
const handleInvalidRoute = (req, res) => {
  console.log(`Invalid route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: 'Route not found' });
};

// Explicitly define all valid routes and handle invalid ones
['get', 'post', 'put', 'patch', 'delete', 'options'].forEach(method => {
  if (typeof router[method] === 'function') {
    // Handle any other methods on the root path
    if (method !== 'get' && method !== 'post') {
      router[method]('/', handleInvalidRoute);
    }
    // Handle other invalid paths
    router[method]('/invalid-route', handleInvalidRoute);
  }
});

console.log('Message routes initialized');

export default router;
