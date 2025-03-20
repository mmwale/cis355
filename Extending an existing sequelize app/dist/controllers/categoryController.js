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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.editCategoryForm = exports.newCategoryForm = exports.getCategory = exports.getAllCategories = void 0;
// TODO: Import Book model
// Get all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Get all categories with their book counts
    }
    catch (error) {
        console.error('Error in getAllCategories:', error);
        res.status(500).render('error', { error: 'Error fetching categories' });
    }
});
exports.getAllCategories = getAllCategories;
// Get a single category with its books
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Get category with its books
    }
    catch (error) {
        console.error('Error in getCategory:', error);
        res.status(500).render('error', { error: 'Error fetching category' });
    }
});
exports.getCategory = getCategory;
// Show form to create a new category
const newCategoryForm = (req, res) => {
    res.render('categories/new', { title: 'Add New Category' });
};
exports.newCategoryForm = newCategoryForm;
// Show form to edit a category
const editCategoryForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo show edit form for category 
    }
    catch (error) {
        console.error('Error in editCategoryForm:', error);
        res.status(500).render('error', { error: 'Error fetching category' });
    }
});
exports.editCategoryForm = editCategoryForm;
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo create new category 
    }
    catch (error) {
        console.error('Error in createCategory:', error);
        return res.status(400).render('categories/new', {
            error: 'Error creating category. Please check your input.',
            category: req.body,
            title: 'Add New Category'
        });
    }
});
exports.createCategory = createCategory;
// Update a category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo implement update category
    }
    catch (error) {
        console.error('Error in updateCategory:', error);
        return res.status(400).render('categories/edit', {
            error: 'Error updating category. Please check your input.',
            category: Object.assign(Object.assign({}, req.body), { id: req.params.id }),
            title: 'Edit Category'
        });
    }
});
exports.updateCategory = updateCategory;
// Delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo implement delete
    }
    catch (error) {
        console.error('Error in deleteCategory:', error);
        return res.status(500).render('error', { error: 'Error deleting category' });
    }
});
exports.deleteCategory = deleteCategory;
