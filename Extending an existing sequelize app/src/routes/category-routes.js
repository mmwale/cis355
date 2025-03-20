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
// GET all categories
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.Category.findAll({
            include: [{
                    model: models_1.Book,
                    as: 'books'
                }]
        });
        res.render('categories/Index', { categories, title: 'Categories' });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load categories' });
    }
}));
// GET add category form
router.get('/new', (req, res) => {
    res.render('categories/Add', { title: 'Add New Category' });
});
// POST create category
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        yield models_1.Category.create({ name, description });
        res.redirect('/categories');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create category' });
    }
}));
// GET edit category form
router.get('/:id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const category = yield models_1.Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }
        res.render('categories/Edit', { category, title: 'Edit Category' });
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit category form' });
    }
}));
// POST update category
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const { name, description } = req.body;
        const category = yield models_1.Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }
        yield category.update({ name, description });
        res.redirect('/categories');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update category' });
    }
}));
// POST delete category
router.post('/:id/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const category = yield models_1.Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }
        yield category.destroy();
        res.redirect('/categories');
    }
    catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete category' });
    }
}));
exports.default = router;
