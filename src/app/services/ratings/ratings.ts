import { Injectable } from '@angular/core';
import { Restaurants, Review } from '../restaurants/restaurants';

@Injectable({ providedIn: 'root' })
export class RatingsService {
  constructor(private restaurantsService: Restaurants) {}

  submitReview(restaurantId: string, data: { userName: string; rating: number; comment: string }): void {
    const restaurant = this.restaurantsService.getById(restaurantId);
    if (!restaurant) return;

    const review: Review = {
      id: `r${Date.now()}`,
      userName: data.userName,
      rating: data.rating,
      date: new Date().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }),
      comment: data.comment,
    };

    restaurant.reviews.unshift(review);
  }
}