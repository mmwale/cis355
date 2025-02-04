STEPS TO RUN THE APPLICATION
Once the application is setup, these are the steps to run the application
1. On the project terminal (i used vscode), initiate the application in the project directory by typing 'node app.js'.
2. To GET a book, open the command prompt or system terminal, navigate to the application directory and type 'curl http://localhost:{PORT NUMBER}/books'. The output will show the first book present in the books.json file.
3. To POST, type 'curl -X POST http://localhost:{PORT NUMBER}/books -H "Content-Type: app/json" -d '{"title": "book title", "author": "author name", "publicationYear": year}' in the command prompt to add the book.
4. To update, type 'curl -X PUT http://localhost:{PORT NUMBER}/books/BOOK NUMBER -H "Content-Type: app/json" -d '{"title": "updated book title", "author": "updated author name", "publicationYear": updated year}'
5. To delete a book, type 'curl http://localhost:{PORT NUMBER}/books/BOOK NUMBER'. This will delete the specified book in the prompt.
