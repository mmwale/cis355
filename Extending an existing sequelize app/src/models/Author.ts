import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Author extends Model {
  public id!: number;
  public name!: string;
  public bio!: string;
  public birthYear!: number;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'author',
  }
);

export default Author;
