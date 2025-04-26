import { Request, Response } from 'express';
import { Deck, Flashcard } from '../models';

// Function to render the form for creating or updating a flashcard
export const getFlashcardForm = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const flashcard = await Flashcard.findByPk(req.params.id);
      return res.render('flashcard-form', { 
        flashcard,
        deckId: req.params.deckId
      });
    }
    res.render('flashcard-form', { deckId: req.params.deckId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Function to create a new flashcard
export const createFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const deck = await Deck.findOne({
      where: { id: req.params.deckId, userId: req.user!.id },
    });

    if (!deck) {
      return res.status(404).send('Deck not found');
    }

    await Flashcard.create({
      question,
      answer,
      deckId: deck.id,
    });
    res.redirect(`/decks/${deck.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating flashcard');
  }
};

// Function to render the form for updating a flashcard
export const updateFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    await Flashcard.update({ question, answer }, {
      where: { id: req.params.id }
    });
    res.redirect(`/decks/${req.params.deckId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating flashcard');
  }
};

// Function to delete a flashcard
export const deleteFlashcard = async (req: Request, res: Response) => {
  try {
    await Flashcard.destroy({
      where: { id: req.params.id }
    });
    res.redirect(`/decks/${req.params.deckId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting flashcard');
  }
};