import express, { Request, Response } from 'express';
import { Author, Book } from '../models';

const router = express.Router();

// GET all authors
router.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await Author.findAll({
            include: [{
                model: Book,
                as: 'books'
            }]
        });
        res.render('authors/Index', { authors, title: 'Authors' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load authors' });
    }
});

// GET add author form
router.get('/new', (req: Request, res: Response) => {
    res.render('authors/Add', { title: 'Add New Author' });
});

// POST create author
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, bio, birthYear } = req.body;
        await Author.create({ name, bio, birthYear: parseInt(birthYear, 10) });
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create author' });
    }
});

// GET edit author form
router.get('/:id/edit', async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id, 10);
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }

        res.render('authors/Edit', { author, title: 'Edit Author' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit author form' });
    }
});

// POST update author
router.post('/:id', async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id, 10);
        const { name, bio, birthYear } = req.body;

        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }

        await author.update({ name, bio, birthYear: parseInt(birthYear, 10) });
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update author' });
    }
});

// POST delete author
router.post('/:id/delete', async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id, 10);
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).render('error', { error: 'Author not found' });
        }

        await author.destroy();
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete author' });
    }
});

export default router;
