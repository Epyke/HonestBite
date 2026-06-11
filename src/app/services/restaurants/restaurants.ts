import { Injectable } from '@angular/core';
import restaurantsData from '../../../assets/data/restaurants.json';

export interface Schedule {
  day: string;
  hours: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Restaurant {
  id: string;
  name: string;
  mapsUrl: string;
  cover: string;
  logo: string;
  distance: string;
  city: string;
  category: string;
  avgPrice: string;
  global: number;
  description: string;
  reviews: Review[];
  schedule: Schedule[];
  menuPhotos: string[];
}

@Injectable({ providedIn: 'root' })
export class Restaurants {
  readonly categories = [
    'Tradicional', 'Petiscos', 'Grelhados',
    'Marisqueira', 'Regional', 'Italiana', 'Japonesa', 'Vegana', 'Outro',
  ];

  private restaurants: Restaurant[] = restaurantsData;

  getAll(): Restaurant[] { return this.restaurants; }
  getById(id: string): Restaurant | undefined {
    return this.restaurants.find(r => r.id === id);
  }

}
