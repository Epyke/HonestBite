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

  private readonly storageKey = 'honestbite_created_restaurants';
  private restaurants: Restaurant[] = restaurantsData;

  getAll(): Restaurant[] {
    return [...this.restaurants, ...this.getCreatedRestaurants()];
  }

  getById(id: string): Restaurant | undefined {
    return this.getAll().find((restaurant) => restaurant.id === id);
  }

  addRestaurant(restaurant: Restaurant): void {
    const createdRestaurants = this.getCreatedRestaurants();
    createdRestaurants.push(restaurant);

    // Fallback local até a integração final com Supabase estar concluída.
    localStorage.setItem(this.storageKey, JSON.stringify(createdRestaurants));
  }

  private getCreatedRestaurants(): Restaurant[] {
    const storedRestaurants = localStorage.getItem(this.storageKey);
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
  }
}