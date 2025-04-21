import { Request, Response } from 'express';
import { Deck, Flashcard } from '../models';

export const getDeck = async (req: Request, res: Response) => {
  try {
    const deck = await Deck.findByPk(req.params.id, {
      include: [Flashcard]
    });
    
    if (!deck) {
      return res.status(404).send('Deck not found');
    }
    
    res.render('deck', { 
      deck: deck.get({ plain: true }),
      user: req.user 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const createDeck = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!req.user || !('id' in req.user)) {
      return res.status(400).send('User not authenticated or invalid user object');
    }
    const deck = await Deck.create({ 
      title,
      userId: (req.user as { id: number }).id 
    });
    res.redirect(`/decks/${deck.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating deck');
  }
};

export const updateDeck = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    await Deck.update({ title }, { 
      where: { id: req.params.id } 
    });
    res.redirect(`/decks/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating deck');
  }
};

export const deleteDeck = async (req: Request, res: Response) => {
  try {
    await Deck.destroy({ 
      where: { id: req.params.id } 
    });
    res.redirect('/decks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting deck');
  }
};