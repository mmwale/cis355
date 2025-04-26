import { Dialect, Sequelize } from 'sequelize';
import config from '../config/config.json';
import Deck from './deck';
import Flashcard from './flashcard';
import User from './user';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize({// Initialize Sequelize
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect,
  logging: false,
});

const db = {// Export the database object
  sequelize,
  Sequelize,
  User,
  Deck,
  Flashcard,
};

// Initialize models
User.initModel(sequelize);
Deck.initModel(sequelize);
Flashcard.initModel(sequelize);

// Set up associations
User.associate(db);
Deck.associate(db);
Flashcard.associate(db);

export { Deck, Flashcard, sequelize, User };
export default db;