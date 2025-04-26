import express from 'express';
import {
    login,
    logout,
    register,
    showLogin,
    showRegister
} from '../controllers/authController';
  
const router = express.Router();// Create a new router instance

// Define routes for authentication
router.get('/login', showLogin);
router.post('/login', login);
router.get('/register', showRegister);
router.post('/register', register);
router.get('/logout', logout);


export default router;