import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { starSharp } from 'ionicons/icons';
import { Review } from '../../services/restaurants/restaurants';

@Component({
  selector: 'review-card',
  templateUrl: 'review-card.component.html',
  styleUrls: ['review-card.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class ReviewCardComponent {
  @Input() review!: Review;

  constructor() {
    addIcons({ starSharp });
  }
}
