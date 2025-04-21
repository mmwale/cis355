import express from 'express';
import authRoutes from './authRoutes';
import deckRoutes from './deckRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/decks', deckRoutes);

export default router;