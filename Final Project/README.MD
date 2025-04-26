The application does not run well. The Typescript compiler cannot associate the type Deck to the User instance. The approach was supposed to simulate a homepage that prompts the user to login first then the Deck will display based afterwards. 

Application Description:
FlashLearn is a full-stack web application designed to help users create and study digital flashcards. Built with Node.js, Express, Sequelize, and Handlebars, it provides a simple yet powerful platform for efficient learning.

1. Install dependencies
2. Set up the database:
Create a MySQL database named flashlearn
Update the database credentials in config/config.json
3. npx sequelize-cli db:migrate
4. Run the application
Dev Mode: npm run dev
Production Mode: npm run build then npm start

PROJECT STRUCTURE
Flash-N-Learn/
├── config/         # Database configuration
├── src/
│   ├── controllers/ # Business logic
│   ├── models/      # Database models
│   ├── routes/      # Application routes
│   ├── views/       # Handlebars templates
│   ├── app.ts       # Express application setup
│   └── server.ts    # Server entry point
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
