import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, computed, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonChip, IonLabel, IonIcon, IonRefresher
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trophyOutline } from 'ionicons/icons';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantCardSkeletonComponent } from '../../components/restaurant-card-skeleton/restaurant-card-skeleton.component';
import {ScreenOrientation, OrientationLockOptions, OrientationLockType} from '@capacitor/screen-orientation';
import { toSignal } from '@angular/core/rxjs-interop';
import {ViewWillEnter} from '@ionic/angular'
import { RestaurantsService } from 'src/app/services/restaurants/restaurants';
import { CategoriesService } from 'src/app/services/categories/categories';
import { RestaurantListItem } from 'src/app/models/restaurant.model';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';

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
    RestaurantCardSkeletonComponent,
    IonRefresher,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page implements ViewWillEnter, OnInit, OnDestroy {

  selectedCategory = 'todos';

  allRestaurants: RestaurantListItem[] = [];
  categories: Category[] = [];

  loading = true;
  skeletonItems = [1, 2, 3, 4];

  private restaurantSub?: Subscription;
  private categorySub?: Subscription;

  constructor(
    private restaurantService: RestaurantsService,
    private categoriesService: CategoriesService,
  ) {
    addIcons({ trophyOutline });
  }

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });

    this.loadRestaurants();
  }

  private loadRestaurants(event?: any): void {
    this.restaurantSub = this.restaurantService.getAll().subscribe({
      next: (data) => {
        this.allRestaurants = data;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error('Error fetching restaurants:', err);
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.restaurantSub) this.restaurantSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

  get popularRestaurants(): RestaurantListItem[] {
  return [...this.allRestaurants].sort((a, b) => b.global - a.global).slice(0, 4);
  }
  
  get filteredRestaurants(): RestaurantListItem[] {
    if (this.selectedCategory === 'todos') return this.allRestaurants;
    return this.allRestaurants.filter(r =>
      r.categories?.some(c => c.value.toLowerCase() === this.selectedCategory.toLowerCase()));
  }

  handleRefresh(event: any): void {
  this.categoriesService.getAll().subscribe({
    next: (data) => this.categories = data,
    error: (err) => console.error('Error fetching categories:', err),
  });
  this.loadRestaurants(event);
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
