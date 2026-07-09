import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, searchOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantCardSkeletonComponent } from '../../components/restaurant-card-skeleton/restaurant-card-skeleton.component';
import { FavoritesService } from '../../services/favorites/favorites';
import { RestaurantListItem } from '../../models/restaurant.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent, IonIcon,
    CustomToolbarComponent,
    RestaurantCardComponent,
    RestaurantCardSkeletonComponent,
  ],
})
export class Tab3Page implements ViewWillEnter, OnDestroy{
  favorites: RestaurantListItem[] = [];
  loading = true;
  skeletonItems = [1, 2, 3, 4];
  private favSub?: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ heartOutline, searchOutline });
  }

  ionViewWillEnter(): void {
    this.loadFavorites();
  }
  
  private loadFavorites(): void {
    const id = this.authService.getUserId();
    if (id == null) { this.loading = false; return; }
    if (this.favorites.length === 0) this.loading = true;
    this.favSub?.unsubscribe();
    this.favSub = this.favoritesService.getUserFavorites(id).subscribe({
      next: (list) => {
        this.favorites = list.reduce<RestaurantListItem[]>(
          (acc, f) => acc.concat(f.restaurant), []);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.loading = false;
      },
    });
  }


  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
  }

  get hasFavorites(): boolean { return this.favorites.length > 0; }
  goToSearch(): void { this.router.navigateByUrl('/tabs/tab2');}
}