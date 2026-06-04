import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonIcon, IonButton, IonButtons, IonFooter,
  IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, locationOutline, cashOutline,
  starSharp, createOutline, heart, heartOutline,
  timeOutline, navigateOutline
} from 'ionicons/icons';
import { Restaurants, Restaurant } from '../../services/restaurants/restaurants';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { FavoritesService } from '../../services/favorites/favorites';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonFooter, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, ReviewCardComponent],
})
export class RestaurantDetailPage implements OnInit {
  restaurant?: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: Restaurants,
    private favoritesService: FavoritesService,
    private location: Location
  ) {
    addIcons({
      arrowBackOutline, locationOutline, cashOutline,
      starSharp, createOutline, heart, heartOutline, timeOutline, navigateOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.restaurant = this.restaurantService.getById(id);
    if (!this.restaurant) this.location.back();
  }

  get isFavorite(): boolean {
    return this.restaurant ? this.favoritesService.isFavorite(this.restaurant.id) : false;
  }

  toggleFavorite(): void {
    if (this.restaurant) this.favoritesService.toggle(this.restaurant.id);
  }

  goBack(): void {
    this.location.back();
  }

  get todayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
  }

  openMaps(): void {
  window.open(this.restaurant!.mapsUrl, '_system');
  }
}