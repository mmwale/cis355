import { Association, DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import Deck from './deck';

class User extends Model {// Define the User model
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Add the Decks association
  declare Decks?: Deck[];
  declare getDecks: HasManyGetAssociationsMixin<Deck>;

  public static associations: {// Define associations
    Decks: Association<User, Deck>;
  };

  static initModel(sequelize: Sequelize) {// Initialize the User model
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    );
  }

  static associate(models: any) {// Define associations here
    this.hasMany(models.Deck, { 
      foreignKey: 'userId', 
      as: 'Decks',
      onDelete: 'CASCADE' // Add cascading delete
    });
  }
}

export default User;