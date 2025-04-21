import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from './index';
import User from './user';

class Deck extends Model<InferAttributes<Deck>, InferCreationAttributes<Deck>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare userId: ForeignKey<User['id']>;

  // Timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.Flashcard, { foreignKey: 'deckId' });
  }
}

Deck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'Deck',
    tableName: 'decks'
  }
);

export default Deck;