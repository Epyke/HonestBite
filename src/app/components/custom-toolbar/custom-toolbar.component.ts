import { Component, OnInit } from '@angular/core';
import { notificationsOutline } from 'ionicons/icons';
import { IonAvatar, IonTitle, IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
@Component({
  selector: 'custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss'],
  imports: [IonAvatar, IonTitle, IonButton, IonIcon, IonBadge],
})
export class CustomToolbarComponent implements OnInit {

  constructor() {addIcons({notificationsOutline}) }

  ngOnInit() {}

}
