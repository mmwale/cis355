"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.editBookForm = exports.getBook = exports.newBookForm = exports.getAllBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
// TODO: Import related models
// import Author 
// import Category 
/*


ALL TODO'S IN THIS ARE OPTIONAL, YOU ONLY NEED TO DO THESE IF YOU WANT THE AUTHORS AND CATEGORIES TO SHOW UP IN THE FORMS AND RETURN DATA
AGAIN THIS FILE IS OPTIONAL. YOU CAN MAKE API ENDPOINTS IN THE OTHER CONTROLLERS TO TEST YOUR NEW MODELS

*/
// Get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Include related models when fetching books
        const books = yield Book_1.default.findAll();
        const plainBooks = books.map(book => book.get({ plain: true }));
        res.render('books/index', { books: plainBooks, title: 'All Books' });
    }
    catch (error) {
        console.error('Error in getAllBooks:', error);
        res.status(500).render('error', { error: 'Error fetching books' });
    }
});
exports.getAllBooks = getAllBooks;
// Show new book form
const newBookForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Get authors and categories for dropdown menus
        res.render('books/new', {
            title: 'Add New Book',
            //TODO send back a authors and categories for the form
        });
    }
    catch (error) {
        console.error('Error in newBookForm:', error);
        res.status(500).render('error', { error: 'Error loading form' });
    }
});
exports.newBookForm = newBookForm;
// Get a single book
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Include related models when fetching a single book
        const book = yield Book_1.default.findByPk(req.params.id);
        if (!book)
            return res.status(404).render('error', { error: 'Book not found' });
        const plainBook = book.get({ plain: true });
        res.render('books/show', { book: plainBook, title: plainBook.title });
    }
    catch (error) {
        console.error('Error in getBook:', error);
        res.status(500).render('error', { error: 'Error fetching book' });
    }
});
exports.getBook = getBook;
// Show edit book form
const editBookForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Get the book with its related models
        const book = yield Book_1.default.findByPk(req.params.id);
        if (!book)
            return res.status(404).render('error', { error: 'Book not found' });
        // TODO: Get all authors and categories for form dropdowns
        // Get the selected category IDs for the book
        const plainBook = book.get({ plain: true });
        res.render('books/edit', {
            book: plainBook,
            title: `Edit ${plainBook.title}`,
            //TODO send back authors and categories
        });
    }
    catch (error) {
        console.error('Error in editBookForm:', error);
        res.status(500).render('error', { error: 'Error fetching book' });
    }
});
exports.editBookForm = editBookForm;
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Handle authorId instead of author field
        const { title, author, isbn, publishedYear, description } = req.body;
        if (!title || !author || !isbn || !publishedYear) {
            // TODO: Get authors and categories for dropdown menus if validation fails
            return res.status(400).render('books/new', {
                error: 'Please fill in all required fields',
                book: req.body,
                title: 'Add New Book',
                //todo send back authors and categories
            });
        }
        const existingBook = yield Book_1.default.findOne({ where: { isbn } });
        if (existingBook) {
            // TODO: Get authors and categories for dropdown menus if validation fails
            return res.status(400).render('books/new', {
                error: 'A book with this ISBN already exists. ISBN must be unique.',
                book: req.body,
                title: 'Add New Book',
                //todo send back authors and categories
            });
        }
        // TODO: Create book with authorId instead of author field
        const book = yield Book_1.default.create({
            title,
            author,
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description: description || ''
        });
        // TODO: Handle many-to-many relationship with categories
        return res.redirect('/books');
    }
    catch (error) {
        console.error('Error in createBook:', error);
        // TODO: Get authors and categories for dropdown menus if there's an error
        let errorMessage = 'Error creating book. Please check your input.';
        if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
            errorMessage = 'A book with this ISBN already exists. ISBN must be unique.';
        }
        return res.status(400).render('books/new', {
            error: errorMessage,
            book: req.body,
            title: 'Add New Book',
            //todo send back authors and categories
        });
    }
});
exports.createBook = createBook;
// Update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByPk(req.params.id);
        if (!book)
            return res.status(404).render('error', { error: 'Book not found' });
        // TODO: Handle authorId instead of author field
        const { title, author, isbn, publishedYear, description } = req.body;
        // TODO: Update book with authorId instead of author field
        yield book.update({
            title,
            author,
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description: description || ''
        });
        // TODO: Handle many-to-many relationship with categories
        return res.redirect('/books');
    }
    catch (error) {
        console.error('Error in updateBook:', error);
        // TODO: Get all authors and categories for form dropdowns if there's an error
        return res.status(400).render('books/edit', {
            error: 'Error updating book. Please check your input.',
            book: Object.assign(Object.assign({}, req.body), { id: req.params.id }),
            title: 'Edit Book',
            //todo send back authors and categories
        });
    }
});
exports.updateBook = updateBook;
// Delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByPk(req.params.id);
        if (!book)
            return res.status(404).render('error', { error: 'Book not found' });
        // TODO: Before deleting, remove associations with categories
        yield book.destroy();
        return res.redirect('/books');
    }
    catch (error) {
        console.error('Error in deleteBook:', error);
        return res.status(500).render('error', { error: 'Error deleting book' });
    }
});
exports.deleteBook = deleteBook;
