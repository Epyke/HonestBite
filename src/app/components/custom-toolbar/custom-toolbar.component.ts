import { Component } from '@angular/core';
import { IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss'],
  imports: [IonTitle],
})
export class CustomToolbarComponent {}