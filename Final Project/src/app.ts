import flash from 'connect-flash';
import dotenv from 'dotenv';
import express from 'express';
import { create } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import './config/passport'; // Ensure passport is configured
import { sequelize } from './models';
import authRoutes from './routes/authRoutes';
import deckRoutes from './routes/deckRoutes';



dotenv.config();// Load environment variables

const app = express();// Create Express app

const hbs = create({// Create Handlebars engine
  extname: '.handlebars',
  defaultLayout: 'home',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views'),
});

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);// Authentication routes
app.use('/decks', deckRoutes);// Deck routes

// Home route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'FlashLearn - Flashcard Study App',
    user: req.user,
    decks: req.user ? req.user.Decks : [], // Show decks if logged in
  });});

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
});

export default app;