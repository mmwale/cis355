import { Dialect, Sequelize } from 'sequelize';
import config from '../config/config.json';
import Deck from './deck';
import Flashcard from './flashcard';
import User from './user';

interface DbInterface {
  sequelize: Sequelize;
  User: typeof User;
  Deck: typeof Deck;
  Flashcard: typeof Flashcard;
}

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect,
  logging: false
});

// No initializeModel needed - models are already initialized in their files
const db: DbInterface = {
  sequelize,
  User,
  Deck,
  Flashcard
};

// Set up associations
Object.values(db).forEach(model => {
  if (model === sequelize) return;
  if ('associate' in model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

export {
  Deck,
  Flashcard, sequelize,
  User
};
