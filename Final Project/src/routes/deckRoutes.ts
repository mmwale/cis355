// src/routes/deckRoutes.ts
import express, { RequestHandler } from 'express';
import {
  createDeck,
  deleteDeck,
  getDeck,
  updateDeck
} from '../controllers/deckController';
import { Deck, Flashcard } from '../models';

const router = express.Router();

router.get('/:id', getDeck as RequestHandler);
router.post('/', createDeck as RequestHandler);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);


// Add this interface to resolve the Flashcards error
interface DeckWithFlashcards extends Deck {
  Flashcards?: Flashcard[];
}

router.get<{ id: string }, {}, {}, { card?: string }>('/:id/study', async (req, res, next) => {
  try {
    const deck = await Deck.findByPk(req.params.id, {
      include: [{
        model: Flashcard,
        as: 'Flashcards'
      }],
      order: [[Flashcard, 'createdAt', 'ASC']]
    }) as unknown as DeckWithFlashcards; // Type assertion

    if (!deck) {
      res.status(404).send('Deck not found');
      return;
    }

    res.render('study', {
      deck: deck.get({ plain: true }),
      currentCardIndex: parseInt(req.query.card || '0'),
      totalCards: deck.Flashcards?.length || 0
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
});

export default router;