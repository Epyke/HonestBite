import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CustomToolbarComponent } from '../components/custom-toolbar/custom-toolbar.component';
import {RestaurantCardComponent} from '../components/restaurant-card/restaurant-card.component';
import {Restaurants, Restaurant} from '../services/restaurants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CustomToolbarComponent, RestaurantCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page {
  constructor(private restaurantService: Restaurants) {}
  
  getRestaurants(): Restaurant[] {
  return this.restaurantService.getAll();
  }
}