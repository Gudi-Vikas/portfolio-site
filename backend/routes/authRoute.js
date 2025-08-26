import express from 'express';
import { adminLogin, adminLogout, verifyAdmin } from '../controllers/authController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Admin login route
authRouter.post('/admin/login', adminLogin);

// Admin logout route
authRouter.post('/admin/logout', verifyAdminToken, adminLogout);

// Verify admin token route
authRouter.get('/admin/verify', verifyAdminToken, verifyAdmin);

export default authRouter;
