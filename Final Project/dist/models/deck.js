"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Deck extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
        this.hasMany(models.Flashcard, { foreignKey: 'deckId' });
    }
}
Deck.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: index_1.sequelize,
    modelName: 'Deck',
    tableName: 'decks'
});
exports.default = Deck;
