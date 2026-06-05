import { Component, Input } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: 'photo-viewer.component.html',
  styleUrls: ['photo-viewer.component.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon],
})
export class PhotoViewerComponent {
  @Input() photoUrl = '';
  @Input() alt = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
