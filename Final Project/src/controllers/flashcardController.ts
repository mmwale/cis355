import { Request, Response } from 'express';
import { Flashcard } from '../models';

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

export const createFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    await Flashcard.create({
      question,
      answer,
      deckId: parseInt(req.params.deckId)
    });
    res.redirect(`/decks/${req.params.deckId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating flashcard');
  }
};

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