import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonSearchbar
} from '@ionic/angular/standalone';
import { CustomToolbarComponent } from '../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../components/restaurant-card/restaurant-card.component';
import { Restaurants, Restaurant } from '../services/restaurants';

interface CategoryCard {
  label: string;
  icon: string;
  keyword: string;
  color: string;
}

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

  categories: CategoryCard[] = [
    { label: 'Tradicional',  icon: '🥘', keyword: 'tradicional', color: '#FFF3E0' },
    { label: 'Petiscos',     icon: '🧀', keyword: 'petiscos',    color: '#F3E5F5' },
    { label: 'Grelhados',    icon: '🔥', keyword: 'grelhados',   color: '#FCE4EC' },
    { label: 'Marisqueira',  icon: '🦞', keyword: 'marisqueira', color: '#E0F7FA' },
    { label: 'Regional',     icon: '🌿', keyword: 'regional',    color: '#E8F5E9' },
    { label: 'Petiscos & Vinhos', icon: '🍷', keyword: 'vinhos', color: '#EDE7F6' },
  ];

  constructor(private restaurantService: Restaurants) {}

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