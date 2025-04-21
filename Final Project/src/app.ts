import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import { sequelize } from './models';
import routes from './routes';

const app = express();

// Handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: true }));

// Routes
app.use('/', routes);

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
});

export default app;