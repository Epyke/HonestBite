import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, searchOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { FavoritesService } from '../../services/favorites/favorites';
import { Restaurants, Restaurant } from '../../services/restaurants/restaurants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent, IonIcon, IonButton,
    CustomToolbarComponent,
    RestaurantCardComponent,
  ],
})
export class Tab3Page {

  constructor(
    private favoritesService: FavoritesService,
    private restaurantService: Restaurants,
    private router: Router
  ) {
    addIcons({ heartOutline, searchOutline });
  }

  get favorites(): Restaurant[] {
    return this.favoritesService
      .getFavoriteIds()
      .map(id => this.restaurantService.getById(id))
      .filter((r): r is Restaurant => r !== undefined);
  }

  get hasFavorites(): boolean {
    return this.favorites.length > 0;
  }

  goToSearch(): void {
    this.router.navigateByUrl('/tabs/tab2');
  }
}