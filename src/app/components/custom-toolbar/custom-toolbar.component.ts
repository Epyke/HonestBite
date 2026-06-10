import { Component, OnInit } from '@angular/core';
import { notificationsOutline } from 'ionicons/icons';
import { IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
@Component({
  selector: 'custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss'],
  imports: [IonTitle],
})
export class CustomToolbarComponent implements OnInit {

  constructor() {addIcons({notificationsOutline}) }

  ngOnInit() {}

}
