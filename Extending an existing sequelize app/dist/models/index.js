"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Category = exports.Book = exports.Author = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const Author_1 = __importDefault(require("./Author"));
exports.Author = Author_1.default;
const Book_1 = __importDefault(require("./Book"));
exports.Book = Book_1.default;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
Author_1.default.hasMany(Book_1.default, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});
Book_1.default.belongsTo(Author_1.default, {
    foreignKey: 'author_id',
});
Book_1.default.belongsToMany(Category_1.default, {
    through: 'BookCategory',
    foreignKey: 'book_id',
});
Category_1.default.belongsToMany(Book_1.default, {
    through: 'BookCategory',
    foreignKey: 'category_id',
});
Book_1.default.prototype.categories = [];
