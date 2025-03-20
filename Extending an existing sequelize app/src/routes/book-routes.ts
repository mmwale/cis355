import express, { Request, Response } from 'express';
import { Author, Book, Category } from '../models/index';

const router = express.Router();

// Helper function to parse categoryIds from string to number array
const parseCategoryIds = (categoryIds: string | string[] | undefined): number[] => {
    if (typeof categoryIds === 'string') {
        return [parseInt(categoryIds, 10)];
    } else if (Array.isArray(categoryIds)) {
        return categoryIds.map(id => parseInt(id, 10));
    } else {
        return [];
    }
};

// GET all books
router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll({
            include: [
                { model: Author, as: 'author' },
                { model: Category, as: 'categories' }
            ]
        });
        res.render('books/Index', { books, title: 'Books' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load books' });
    }
});

// GET add book form
router.get('/new', async (req: Request, res: Response) => {
    try {
        const authors = await Author.findAll();
        const categories = await Category.findAll();
        res.render('books/New', {
            title: 'Add New Book',
            authors,
            categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load new book form' });
    }
});

// POST create book
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, author_id, isbn, publishedYear, description, categoryIds } = req.body;

        const book = await Book.create({
            title,
            author_id: parseInt(author_id, 10),
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description
        });

        const parsedCategoryIds = parseCategoryIds(categoryIds);
        if (parsedCategoryIds.length > 0) {
            const categories = await Category.findAll({
                where: {
                    id: parsedCategoryIds
                }
            });
            await book.set('categories', categories);
        }

        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to create book' });
    }
});

// GET edit book form
router.get('/:id/edit', async (req: Request, res: Response) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = await Book.findByPk(bookId, {
            include: [
                { model: Author, as: 'author' },
                { model: Category, as: 'categories' }
            ]
        });

        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }

        const authors = await Author.findAll();
        const categories = await Category.findAll();

        // Extract category IDs for pre-selection in the edit form
        const categoryIds = (book as Book & { categories: Category[] }).categories.map(
            (category) => category.id
          );
                  res.render('books/Edit', {
            title: 'Edit Book',
            book,
            authors,
            categories,
            categoryIds
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to load edit book form' });
    }
});

// POST update book
router.post('/:id', async (req: Request, res: Response) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const { title, author_id, isbn, publishedYear, description, categoryIds } = req.body;

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }

        await book.update({
            title,
            author_id: parseInt(author_id, 10),
            isbn,
            publishedYear: parseInt(publishedYear, 10),
            description
        });

        const parsedCategoryIds = parseCategoryIds(categoryIds);

        let categories: Category[] = [];
        if (parsedCategoryIds.length > 0) {
            categories = await Category.findAll({
                where: {
                    id: parsedCategoryIds
                }
            });
        }
        await book.set('categories', categories);

        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to update book' });
    }
});

// GET view book details
router.get('/view/:id', async (req: Request, res: Response) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = await Book.findByPk(bookId, {
            include: [
                { model: Author, as: 'author' },
                { model: Category, as: 'categories' }
            ]
        });

        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }

        res.render('books/Show', { book, title: book.title });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to view book' });
    }
});

// POST delete book
router.post('/:id/delete', async (req: Request, res: Response) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' });
        }

        await book.destroy();
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Failed to delete book' });
    }
});

export default router;
