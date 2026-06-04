import { Injectable } from '@angular/core';

export interface Category {
  label: string;
  value: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class Categories {
  categories: Category[] = [
    { label: 'Todos',       value: 'todos', color: '#e8f4f1' },
    { label: 'Tradicional', value: 'tradicional', color: '#fef3e2' },
    { label: 'Petiscos',    value: 'petiscos', color: '#fde8e8' },
    { label: 'Grelhados',   value: 'grelhados', color: '#fff3e0' },
    { label: 'Marisqueira', value: 'marisqueira', color: '#e8f0fe' },
    { label: 'Regional',    value: 'regional', color: '#e8f4e8' },
  ];
  getAll(): Category[] { return this.categories; }
}
