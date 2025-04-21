import { DataTypes, Model } from 'sequelize';
import { Deck, sequelize } from './index';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  
  // Add these for consistency
  declare createdAt: Date;
  declare updatedAt: Date;
  
  static associate(models: { Deck: typeof Deck }) {
    this.hasMany(models.Deck, { foreignKey: 'userId' });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, { 
  sequelize, 
  modelName: 'user',
  tableName: 'users'
});

export default User;