import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { starSharp, locationOutline, cashOutline } from 'ionicons/icons';
import { RestaurantListItem } from '../../models/restaurant.model';

@Component({
  selector: 'restaurant-card',
  templateUrl: 'restaurant-card.component.html',
  styleUrls: ['restaurant-card.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class RestaurantCardComponent {
  @Input() restaurant!: RestaurantListItem;
  @Input() variant: 'compact' | 'full' = 'full';

  constructor(private router: Router) {
    addIcons({ starSharp, locationOutline, cashOutline });
  }

  openDetail(): void {
    this.router.navigate(['/restaurant', this.restaurant.id]);
  }

  get coverUrl(): string { return this.restaurant.cover; }
  get categoryLabel(): string { return this.restaurant.categories?.[0]?.label ?? ''; }
  get city(): string { return this.restaurant.adress?.city ?? ''; }
}