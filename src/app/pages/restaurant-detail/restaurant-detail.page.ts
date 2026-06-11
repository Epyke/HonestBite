import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonIcon, IonButton, IonButtons, IonFooter,
  IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, locationOutline, cashOutline,
  starSharp, createOutline, heart, heartOutline,
  timeOutline, navigateOutline, fastFoodOutline
} from 'ionicons/icons';
import { Restaurants, Restaurant } from '../../services/restaurants/restaurants';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { FavoritesService } from '../../services/favorites/favorites';
import { RatingsService } from '../../services/ratings/ratings';
import { ModalController } from '@ionic/angular/standalone';
import { MenuModalComponent } from '../../components/menu-modal/menu-modal.component';
import { ReviewFormModalComponent } from '../../components/review-form-modal/review-form-modal.component';
import { userService } from '../../services/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonBackButton, ReviewCardComponent],
})
export class RestaurantDetailPage implements OnInit {
  restaurant?: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: Restaurants,
    private favoritesService: FavoritesService,
    private ratingsService: RatingsService,
    private location: Location,
    private modalCtrl: ModalController,
    private authService: userService,
    private router: Router,
  ) {
    addIcons({
      arrowBackOutline, locationOutline, cashOutline,
      starSharp, createOutline, heart, heartOutline, timeOutline, navigateOutline, fastFoodOutline
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

  async openMenu(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MenuModalComponent,
      componentProps: {
        photos: this.restaurant!.menuPhotos,
        restaurantName: this.restaurant!.name,
      },
    });
    await modal.present();
  }

  async openReviewForm(): Promise<void> {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return;
    }
    const modal = await this.modalCtrl.create({
      component: ReviewFormModalComponent,
      componentProps: {
        restaurantId: this.restaurant!.id,
        restaurantName: this.restaurant!.name,
      },
      breakpoints: [0, 0.62],
      initialBreakpoint: 0.62,
      backdropBreakpoint: 0.62,
      handleBehavior: 'cycle',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.ratingsService.submitReview(this.restaurant!.id, data);
    }
  }
}