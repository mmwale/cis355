Assignment: extend a existing sequelize application
The applications uses Node.js, Express, TypeScript and Sequelize ORM. The application simulates a library system management. It allows users to create, read, update and remove CRUD records inside a book database.
WARNING:
- May contain a few bugs, but logic points to the correct utilization to run the application
- Ensure DB details are according to your MySQL DB details
- Ensure database is running before running the application
STEPS TO RUN THE APPLICATION
1. After placing all the files respectfully, run npm install
2. Ensure your database details are correctly set to the config.json or .env file
3. Run npx sequelize init to initiate the program and produce the necessary files in ts and/or js
4. Set up the database by running npx sequelize db:migrate
5. Run the application by typing npm run dev or npm start
