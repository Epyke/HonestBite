import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonIcon, IonButton, IonButtons, IonFooter,
  IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonBackButton, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, locationOutline, cashOutline,
  starSharp, createOutline, heart, heartOutline,
  timeOutline, navigateOutline, fastFoodOutline
} from 'ionicons/icons';
import { RestaurantDetail } from '../../models/restaurant.model';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { FavoritesService } from '../../services/favorites/favorites';
import { RatingsService } from '../../services/ratings/ratings';
import { ModalController } from '@ionic/angular/standalone';
import { MenuModalComponent } from '../../components/menu-modal/menu-modal.component';
import { ReviewFormModalComponent } from '../../components/review-form-modal/review-form-modal.component';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.js';
import { ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonFooter, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonBackButton, ReviewCardComponent, IonSpinner],
})
export class RestaurantDetailPage implements OnInit, ViewWillLeave {
  restaurant?: RestaurantDetail;
  isFavorite: boolean = false;
  isLoading = true;

  private reviewModal?: HTMLIonModalElement;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private favoritesService: FavoritesService,
    private ratingsService: RatingsService,
    private location: Location,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router,
  ) {
    addIcons({
      arrowBackOutline, locationOutline, cashOutline,
      starSharp, createOutline, heart, heartOutline, timeOutline, navigateOutline, fastFoodOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {this.location.back(); return;}
    this.restaurantService.getById(Number(id)).subscribe({
      next: (r) => {
        this.restaurant = r;
        this.isLoading = false
        this.loadFavoriteStatus(r.id);
      },
      error: () => this.location.back(),
    });
  }

  goBack(): void {
    this.location.back();
  }

  get todayIndex(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
  }

  openMaps(): void {
    const query = [this.restaurant?.street, this.restaurant?.city]
      .filter(Boolean)
      .join(', ');
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_system');
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

  private loadFavoriteStatus(restaurantId: number): void {
  const userId = this.authService.getUserId();
  if (userId == null) return;
  this.favoritesService.getStatus(userId, restaurantId).subscribe({
      next: (s) => this.isFavorite = s.favorited,
      error: (err) => console.error('Error loading favorite status:', err),
    });
  }

  toggleFavorite(): void {
    const userId = this.authService.getUserId();
    if (userId == null || !this.restaurant) { this.router.navigateByUrl('/login'); return; }
    this.favoritesService.toggle(userId, this.restaurant.id).subscribe({
      next: (s) => this.isFavorite = s.favorited,
      error: (err) => console.error('Error toggling favorite:', err),
    });
  }

  async openReviewForm(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return;
    }
    const modal = await this.modalCtrl.create({
      component: ReviewFormModalComponent,
      componentProps: {
        restaurantId: this.restaurant!.id,
        restaurantName: this.restaurant!.name,
      },
      breakpoints: [0, 0.62, 1],
      initialBreakpoint: 0.62,
      backdropBreakpoint: 0.62,
      handleBehavior: 'cycle',
    });
    this.reviewModal = modal;
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.reviewModal = undefined;
    if (role === 'confirm') {
      this.ratingsService.create({
      restaurantId: this.restaurant!.id,
      score: data.rating,
      comment: data.comment,
    }).subscribe({ error: (err) => console.error('Error submitting rating:', err) });
    }
  }

  ionViewWillLeave(): void {
    this.reviewModal?.dismiss();
  }
}