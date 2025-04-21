import express from 'express';
import {
    createFlashcard,
    deleteFlashcard,
    getFlashcardForm,
    updateFlashcard
} from '../controllers/flashcardController';

const router = express.Router();

router.get('/:deckId/flashcards/new', getFlashcardForm);
router.get('/:deckId/flashcards/:id/edit', getFlashcardForm);
router.post('/:deckId/flashcards', createFlashcard);
router.put('/:deckId/flashcards/:id', updateFlashcard);
router.delete('/:deckId/flashcards/:id', deleteFlashcard);

export default router;