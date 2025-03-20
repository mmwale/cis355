import express, { Request, Response } from 'express';
import { Book, Category } from '../models';


const router = express.Router();

// GET all categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Book,
                as: 'books'
            }]
        });
        res.render('categories/Index', { categories, title: 'Categories' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load categories' });
    }
});

// GET add category form
router.get('/new', (req: Request, res: Response) => {
    res.render('categories/Add', { title: 'Add New Category' });
});

// POST create category
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        await Category.create({ name, description });
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create category' });
    }
});

// GET edit category form
router.get('/:id/edit', async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }

        res.render('categories/Edit', { category, title: 'Edit Category' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit category form' });
    }
});

// POST update category
router.post('/:id', async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const { name, description } = req.body;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }

        await category.update({ name, description });
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update category' });
    }
});

// POST delete category
router.post('/:id/delete', async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).render('error', { error: 'Category not found' });
        }

        await category.destroy();
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete category' });
    }
});

export default router;
