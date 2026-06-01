import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonIcon, IonButton, IonButtons, IonFooter
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, locationOutline, cashOutline,
  starSharp, createOutline
} from 'ionicons/icons';
import { Restaurants, Restaurant } from '../services/restaurants';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonButtons, IonFooter],
})
export class RestaurantDetailPage implements OnInit {
  restaurant?: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: Restaurants,
    private location: Location
  ) {
    addIcons({ arrowBackOutline, locationOutline, cashOutline, starSharp, createOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.restaurant = this.restaurantService.getById(id);
    if (!this.restaurant) this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}