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
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
// Helper function to parse categoryIds from string to number array
const parseCategoryIds = (categoryIds) => {
    if (typeof categoryIds === 'string') {
        return [parseInt(categoryIds, 10)];
    }
    else if (Array.isArray(categoryIds)) {
        return categoryIds.map(id => parseInt(id, 10));
    }
    else {
        return [];
    }
};
// GET all books
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield models_1.Book.findAll({
            include: [
                { model: models_1.Author, as: 'author' },
                { model: models_1.Category, as: 'categories' }
            ]
        });
        res.render('books/Index', { books, title: 'Books' });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load books' });
    }
}));
// GET add book form
router.get('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield models_1.Author.findAll();
        const categories = yield models_1.Category.findAll();
        res.render('books/New', {
            title: 'Add New Book',
            authors,
            categories
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load new book form' });
    }
}));
// POST create book
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author_id, isbn, publishedYear, description, categoryIds } = req.body;
        const book = yield models_1.Book.create({
            title,
            author_id: parseInt(author_id, 10),
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description
        });
        const parsedCategoryIds = parseCategoryIds(categoryIds);
        if (parsedCategoryIds.length > 0) {
            const categories = yield models_1.Category.findAll({
                where: {
                    id: parsedCategoryIds
                }
            });
            yield book.$set('categories', categories);
        }
        res.redirect('/books');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create book' });
    }
}));
// GET edit book form
router.get('/:id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = yield models_1.Book.findByPk(bookId, {
            include: [
                { model: models_1.Author, as: 'author' },
                { model: models_1.Category, as: 'categories' }
            ]
        });
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }
        const authors = yield models_1.Author.findAll();
        const categories = yield models_1.Category.findAll();
        // Extract category IDs for pre-selection in the edit form
        const categoryIds = book.categories.map(category => category.id);
        res.render('books/Edit', {
            title: 'Edit Book',
            book,
            authors,
            categories,
            categoryIds
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit book form' });
    }
}));
// POST update book
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = parseInt(req.params.id, 10);
        const { title, author_id, isbn, publishedYear, description, categoryIds } = req.body;
        const book = yield models_1.Book.findByPk(bookId);
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }
        yield book.update({
            title,
            author_id: parseInt(author_id, 10),
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description
        });
        const parsedCategoryIds = parseCategoryIds(categoryIds);
        let categories = [];
        if (parsedCategoryIds.length > 0) {
            categories = yield models_1.Category.findAll({
                where: {
                    id: parsedCategoryIds
                }
            });
        }
        yield book.$set('categories', categories);
        res.redirect('/books');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update book' });
    }
}));
// GET view book details
router.get('/view/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = yield models_1.Book.findByPk(bookId, {
            include: [
                { model: models_1.Author, as: 'author' },
                { model: models_1.Category, as: 'categories' }
            ]
        });
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }
        res.render('books/Show', { book, title: book.title });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to view book' });
    }
}));
// POST delete book
router.post('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = yield models_1.Book.findByPk(bookId);
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }
        yield book.destroy();
        res.redirect('/books');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete book' });
    }
}));
exports.default = router;
