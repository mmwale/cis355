"use strict";
const Book = require('./Book');
const Author = require('./Author');
const Category = require('./Category');
Author.hasMany(Book, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});
Book.belongsTo(Author, {
    foreignKey: 'author_id',
});
Book.belongsToMany(Category, {
    through: 'BookCategory',
    foreignKey: 'book_id',
});
Category.belongsToMany(Book, {
    through: 'BookCategory',
    foreignKey: 'category_id',
});
module.exports = { Book, Author, Category };
