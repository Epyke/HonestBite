import { Component, Input } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'restaurant-card-skeleton',
  templateUrl: 'restaurant-card-skeleton.component.html',
  styleUrls: ['restaurant-card-skeleton.component.scss'],
  standalone: true,
  imports: [IonSkeletonText],
})
export class RestaurantCardSkeletonComponent {
  @Input() variant: 'compact' | 'full' = 'full';
}
