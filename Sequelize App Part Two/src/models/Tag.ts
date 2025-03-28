/**
 * Tag Model
 * 
 * This model represents a tag in the task management system.
 * It demonstrates:
 * 1. TypeScript interfaces for type safety
 * 2. Sequelize model definition with validations
 * 3. Instance methods for business logic
 * 4. Database relationships (belongsToMany)
 * 5. Color validation and handling
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Task } from './Task';


/**
 * Tag Model Class
 * 
 * Extends Sequelize's Model class to create a Tag model with:
 * - Type-safe attributes
 * - Validations
 * - Instance methods
 * - Database relationships
 */
export class Tag extends Model {
  // Basic properties
  public id!: number;
  public name!: string;
  public color!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association mixins
  public getTasks!: () => Promise<Task[]>;
  public setTasks!: (tasks: Task[]) => Promise<void>;
  public addTask!: (task: Task) => Promise<void>;
  public removeTask!: (task: Task) => Promise<void>;

}

// Initialize the Tag model with Sequelize
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 50] // Name must be between 1 and 50 characters
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#3498db', // Default color
      //TODO: Implement validation for color:
      // 1. Must be a valid hex color code
      validate: {
        isHexColor(value: string) {
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          if (!hexRegex.test(value)) {
            throw new Error('Color must be a valid hex code');
          }
        }
      }
    },    
    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'tags',
    modelName: 'Tag',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name'],
      }
    ],
    
  }
); 