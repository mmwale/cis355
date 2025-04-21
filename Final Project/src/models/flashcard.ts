import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Deck from './deck';
import { sequelize } from './index';

class Flashcard extends Model<InferAttributes<Flashcard>, InferCreationAttributes<Flashcard>> {
  declare id: CreationOptional<number>;
  declare question: string;
  declare answer: string;
  declare deckId: ForeignKey<Deck['id']>;

  // Timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Deck, { foreignKey: 'deckId' });
  }
}

Flashcard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'decks',
        key: 'id'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'Flashcard',
    tableName: 'flashcards'
  }
);

export default Flashcard;