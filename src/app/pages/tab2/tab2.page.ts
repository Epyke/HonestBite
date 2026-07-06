import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonSearchbar
} from '@ionic/angular/standalone';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { Restaurants, Restaurant } from '../../services/restaurants/restaurants';
import { Categories, Category } from '../../services/categories/categories';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent, IonSearchbar,
    CustomToolbarComponent,
    RestaurantCardComponent,
  ],
})
export class Tab2Page {

  searchQuery = '';
  categories: Category[] = [];

  constructor(
    private restaurantService: Restaurants,
    private categoriesService: Categories,
  ) {
    this.categories = this.categoriesService.getAll();
  }

  get isSearching(): boolean {
    return this.searchQuery.trim().length > 0;
  }

  get results(): Restaurant[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return [];
    return this.restaurantService.getAll().filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q)
    );
  }

  onSearch(event: any): void {
    this.searchQuery = event.detail.value ?? '';
  }

  searchByCategory(keyword: string): void {
    this.searchQuery = keyword;
  }
}