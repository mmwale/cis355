/**
 * User Model
 * 
 * This model represents a user in the task management system.
 * It demonstrates:
 * 1. TypeScript interfaces for type safety
 * 2. Sequelize model definition with validations
 * 3. Database relationships (hasMany)
 * 4. Password hashing and validation
 * 5. Email format validation
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

/**
 * User Model Class
 * 
 * Extends Sequelize's Model class to create a User model with:
 * - Type-safe attributes
 * - Validations
 * - Database relationships
 * - Password handling
 */
export class User extends Model {
  // Basic properties
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Simple association types
  public getTasks!: () => Promise<any[]>;
  public getProjects!: (filter?: any) => Promise<any[]>;
  /**
   * Get the user's full name
   * 
   * @returns string - The user's full name
   */
  public getFullName(): string {
    //TODO: Implement this method to concatenate the user's first and last name with a space in between
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Get the user's task completion rate
   * 
   * @returns Promise<string> - Completion rate percentage (e.g., "75%")
   */
  public async getTaskCompletionRate(): Promise<string> {
    //TODO: Implement this method to calculate the percentage of the user's tasks that are completed
    // 1. Get all tasks belonging to this user
    // 2. Count how many have status 'completed'
    // 3. Calculate the percentage and return it as a string with % symbol
    const tasks = await this.getTasks();
  if (!tasks.length) return '0%';
  const completed = tasks.filter(task => task.status === 'completed').length;
  const rate = (completed / tasks.length) * 100;
  return `${Math.round(rate)}%`;
  }

  /**
   * Get the user's active projects count
   * 
   * @returns Promise<number> - Number of active projects
   */
  public async getActiveProjectsCount(): Promise<number> {
    //TODO: Implement this method to count the number of projects where status is 'active'
    // Use a Sequelize query with a where clause to filter by status
    const projects = await this.getProjects({ where: { status: 'active' } });
  return projects.length;
  }


}

// Initialize the User model with Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      //TODO: Implement validation for username:
      // 1. Must be unique
      // 2. Length between 3-30 characters
      // 3. Can only contain alphanumeric characters (letters and numbers)
      unique: true,
  validate: {
    len: [3, 30]
  }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //TODO: Implement validation for email:
      // 1. Must be unique
      // 2. Must be a valid email format
      // 3. Normalize email to lowercase before saving
      unique: true,
  validate: {
    isEmail: true
  }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //TODO: Implement validation for password:
      // 1. Length between 8-100 characters
      // 2. Must contain at least one uppercase letter
      // 3. Must contain at least one number
      // 4. Must contain at least one special character
      validate: {
        len: [8, 100],
        isStrong(value: string) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter');
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      //TODO: Implement validation for firstName:
      // 1. Length between 2-50 characters
      // 2. Cannot contain numbers or special characters
      validate: {
        len: [2, 50],
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      //TODO: Implement validation for lastName:
      // 1. Length between 2-50 characters
      // 2. Cannot contain numbers or special characters
      validate: {
        len: [2, 50],
        isAlpha: true
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
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['email']
      }
    ],
    hooks: {
    
    },
    
   
  }
); 