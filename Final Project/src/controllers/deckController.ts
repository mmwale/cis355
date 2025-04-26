import { Request, Response } from 'express';
import 'src/types/express.d.ts'; // Adjust the import path as necessary
import { Deck, Flashcard } from '../models';

declare namespace Express {
  export interface User {
    id: number; // Add the 'id' property to the User type
    Decks?: Deck[]; // Add Decks property to the User type
  }
}

// Controller functions for handling deck-related requests
    export const getDeck = async (req: Request, res: Response) => {
      try {
        const deck = await Deck.findOne({
          where: { id: req.params.id, userId: req.user?.id! },
          include: [Flashcard],
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

  // Function to render the form for creating a new deck
export const createDeck = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!req.user || !('id' in req.user)) {
      return res.status(400).send('User not authenticated or invalid user object');
    }
    const deck = await Deck.create({
      title,
      userId: req.user?.id,
    });
    res.redirect(`/decks/${deck.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating deck');
  }
};

// Function to render the form for updating a deck
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

// Function to delete a deck
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