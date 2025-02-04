const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3076;
const BOOKS_FILE = path.join(__dirname, "books.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to read books from the file
function readBooks() {
  const data = fs.readFileSync(BOOKS_FILE, "utf-8");
  return JSON.parse(data);
}

// Helper function to write books to the file
function writeBooks(books) {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2), "utf-8");
}

// GET /books - Retrieve all books
app.get("/books", (req, res) => {
  const books = readBooks();
  res.json(books);
});

// POST /books - Add a new book
app.post("/books", (req, res) => {
  const { title, author, publicationYear } = req.body;

  // Validate request body
  if (!title || !author || !publicationYear) {
    return res.status(400).json({ error: "Missing required fields: title, author, publicationYear" });
  }

  const books = readBooks();
  const newBook = {
    id: books.length + 1, // Generate a unique ID
    title,
    author,
    publicationYear,
  };

  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;

  // Validate request body
  if (!title || !author || !publicationYear) {
    return res.status(400).json({ error: "Missing required fields: title, author, publicationYear" });
  }

  const books = readBooks();
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], title, author, publicationYear };
  writeBooks(books);

  res.json(books[bookIndex]);
});

// DELETE /books/:id - Delete a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const books = readBooks();
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  writeBooks(books);

  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});