import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonChip, IonLabel, IonIcon, IonRefresher
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trophyOutline } from 'ionicons/icons';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { Restaurants, Restaurant } from '../../services/restaurants/restaurants';
import { Categories, Category } from '../../services/categories/categories';
import {ScreenOrientation, OrientationLockOptions, OrientationLockType} from '@capacitor/screen-orientation';
import {ViewWillEnter} from '@ionic/angular'

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
    IonRefresher,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page implements ViewWillEnter {

  selectedCategory = 'todos';
  categories: Category[] = [];

  constructor(
    private restaurantService: Restaurants,
    private categoriesService: Categories,
  ) {
    addIcons({ trophyOutline });
    this.categories = this.categoriesService.getAll();
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

  handleRefresh(event: any): void {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  selectCategory(value: string): void {
    this.selectedCategory = value;
  }

  async ionViewWillEnter(): Promise<void> {
    const orientation: OrientationLockType = 'portrait';
    const options: OrientationLockOptions = { orientation };
    await ScreenOrientation.lock(options);
  }
}
