import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonChip, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sparklesOutline } from 'ionicons/icons';
import { CustomToolbarComponent } from '../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../components/restaurant-card/restaurant-card.component';
import { Restaurants, Restaurant } from '../services/restaurants';

interface Category {
  label: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent,
    IonChip, IonLabel, IonIcon,
    CustomToolbarComponent,
    RestaurantCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page {

  categories: Category[] = [
    { label: 'Todos',       value: 'todos',       icon: '🍽️' },
    { label: 'Tradicional', value: 'tradicional', icon: '🥘' },
    { label: 'Petiscos',    value: 'petiscos',    icon: '🧀' },
    { label: 'Grelhados',   value: 'grelhados',   icon: '🔥' },
    { label: 'Marisqueira', value: 'marisqueira', icon: '🦞' },
    { label: 'Regional',    value: 'regional',    icon: '🌿' },
  ];

  selectedCategory = 'todos';

  constructor(private restaurantService: Restaurants) {
    addIcons({ sparklesOutline });
  }

  get popularRestaurants(): Restaurant[] {
    return [...this.restaurantService.getAll()]
      .sort((a, b) => b.global - a.global)
      .slice(0, 4);
  }

  get filteredRestaurants(): Restaurant[] {
    const all = this.restaurantService.getAll();
    if (this.selectedCategory === 'todos') return all;
    return all.filter(r =>
      r.category.toLowerCase().includes(this.selectedCategory)
    );
  }

  selectCategory(value: string): void {
    this.selectedCategory = value;
  }
}