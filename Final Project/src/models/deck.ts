import { DataTypes, Model, Sequelize } from 'sequelize';

class Deck extends Model {// Define the Deck model
  public id!: number;
  public title!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  static initModel(sequelize: Sequelize) {// Initialize the Deck model
    Deck.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Deck',
        tableName: 'decks',
      }
    );
  }

  static associate(models: any) {// Define associations here
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    this.hasMany(models.Flashcard, { foreignKey: 'deckId' });
  }
}

export default Deck;