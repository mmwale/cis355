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
// GET all authors
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield models_1.Author.findAll({
            include: [{
                    model: models_1.Book,
                    as: 'books'
                }]
        });
        res.render('authors/Index', { authors, title: 'Authors' });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load authors' });
    }
}));
// GET add author form
router.get('/new', (req, res) => {
    res.render('authors/Add', { title: 'Add New Author' });
});
// POST create author
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bio, birthYear } = req.body;
        yield models_1.Author.create({ name, bio, birthYear: parseInt(birthYear, 10) });
        res.redirect('/authors');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create author' });
    }
}));
// GET edit author form
router.get('/:id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = parseInt(req.params.id, 10);
        const author = yield models_1.Author.findByPk(authorId);
        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }
        res.render('authors/Edit', { author, title: 'Edit Author' });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit author form' });
    }
}));
// POST update author
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = parseInt(req.params.id, 10);
        const { name, bio, birthYear } = req.body;
        const author = yield models_1.Author.findByPk(authorId);
        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }
        yield author.update({ name, bio, birthYear: parseInt(birthYear, 10) });
        res.redirect('/authors');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update author' });
    }
}));
// POST delete author
router.post('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = parseInt(req.params.id, 10);
        const author = yield models_1.Author.findByPk(authorId);
        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }
        yield author.destroy();
        res.redirect('/authors');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete author' });
    }
}));
exports.default = router;
