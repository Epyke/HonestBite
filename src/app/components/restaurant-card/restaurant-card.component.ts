import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'restaurant-card',
  templateUrl: 'restaurant-card.component.html',
  styleUrls: ['restaurant-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class RestaurantCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() cover = '';
  @Input() logo = '';
  @Input() distance = '';
  @Input() city = '';
  @Input() category = '';
  @Input() avgPrice = '';

  constructor(private router: Router){
  }

  /**
  openRestuarant(id: string) {
    this.router.navigate(['/books', id]);
  }
  */
}