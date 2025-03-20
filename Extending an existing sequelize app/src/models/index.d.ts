declare module '../models' {
    import { Model, ModelCtor } from 'sequelize';
  
    export interface Author extends Model {
      id: number;
      name: string;
      bio?: string;
      birthYear?: number;
    }
  
    export interface Book extends Model {
      id: number;
      title: string;
      author_id: number;
      isbn: string;
      publishedYear?: number;
      description?: string;
    }
  
    export interface Category extends Model {
      id: number;
      name: string;
      description?: string;
    }
  
    export const Book: ModelCtor<Book>;
    export const Author: ModelCtor<Author>;
    export const Category: ModelCtor<Category>;
  }
  