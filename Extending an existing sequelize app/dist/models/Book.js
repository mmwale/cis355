"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// TODO: Import related models
// import Author from './Author';
// import Category from './Category';
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    publishedYear: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Authors',
            key: 'id'
        }
    },
}, {
    sequelize: database_1.default,
    modelName: 'Book',
});
// TODO: Define Book -> Author association (belongs to)
// TODO: Define Book -> Category association (many-to-many)
exports.default = Book;
