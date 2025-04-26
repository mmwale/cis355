import Deck from '../../models/deck';

declare global {// Extend the Express namespace to include the User type
  namespace Express {
    interface User {
        id: number; // Add the 'id' property to the User type
      Decks?: Deck[]; // Add Decks property to the User type
    }
  }
}