import sequelize from '../config/database';
import Author from './Author';
import Book from './Book';
import Category from './Category';

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

  Book.prototype.categories = [];

  export { Author, Book, Category, sequelize };

