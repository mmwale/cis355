"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Flashcard extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Deck, { foreignKey: 'deckId' });
    }
}
Flashcard.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    deckId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'decks',
            key: 'id'
        }
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: index_1.sequelize,
    modelName: 'Flashcard',
    tableName: 'flashcards'
});
exports.default = Flashcard;
