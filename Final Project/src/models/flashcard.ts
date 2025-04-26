import { DataTypes, Model, Sequelize } from 'sequelize';


class Flashcard extends Model {// Define the Flashcard model
  static initModel(sequelize: Sequelize) {// Initialize the Flashcard model
    Flashcard.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deckId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'decks',
            key: 'id',
          },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Flashcard',
        tableName: 'flashcards',
      }
    );
  }

  static associate(models: any) {// Define associations here
    this.belongsTo(models.Deck, { foreignKey: 'deckId' });
  }
}

export default Flashcard;