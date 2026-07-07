import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonSearchbar
} from '@ionic/angular/standalone';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantListItem } from '../../models/restaurant.model';
import { Category } from '../../models/category.model';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants';
import { CategoriesService } from 'src/app/services/categories/categories';
import { Subscription } from 'rxjs';

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
export class Tab2Page implements OnInit, OnDestroy {

  searchQuery = '';
  
  restaurants: RestaurantListItem[] = [];
  categories: Category[] = [];
  
  private restaurantSub?: Subscription;
  private categorySub?: Subscription;

  constructor(private restaurantService: RestaurantsService, private categoriesService: CategoriesService){}

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading search categories:', err)
    });

    this.restaurantSub = this.restaurantService.getAll().subscribe({
      next: (data) => this.restaurants = data,
      error: (err) => console.error('Error loading search data pool:', err)
    });
  }

  ngOnDestroy(): void {
    if (this.restaurantSub) this.restaurantSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

  get isSearching(): boolean {
    return this.searchQuery.trim().length > 0;
  }

  get results(): RestaurantListItem[] {
  const q = this.searchQuery.trim().toLowerCase();
  if (!q) return [];
  return this.restaurants.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.categories?.some(c => c.label.toLowerCase().includes(q)) ||
    (r.adress?.city ?? '').toLowerCase().includes(q));
  }

  onSearch(event: any): void {
    this.searchQuery = event.detail.value ?? '';
  }

  searchByCategory(keyword: string): void {
    this.searchQuery = keyword;
  }
}