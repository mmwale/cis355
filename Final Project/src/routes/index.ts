import express from 'express';
import authRoutes from './authRoutes';
import deckRoutes from './deckRoutes';

const router = express.Router();// Create a new router instance

// Define routes for authentication and decks
router.use('/auth', authRoutes);
router.use('/decks', deckRoutes);

// Redirect /login to the auth route
router.get('/login', (req, res) => res.redirect('/auth/login'));

// Redirect /register to the auth route
router.get('/register', (req, res) => res.redirect('/auth/register'));

export default router;