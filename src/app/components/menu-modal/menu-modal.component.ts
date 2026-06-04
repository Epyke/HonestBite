import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, expandOutline } from 'ionicons/icons';
import { PhotoViewerComponent } from '../photo-viewer/photo-viewer.component';

@Component({
  selector: 'app-menu-modal',
  templateUrl: 'menu-modal.component.html',
  styleUrls: ['menu-modal.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon],
})
export class MenuModalComponent {
  @Input() photos: string[] = [];
  @Input() restaurantName = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline, expandOutline });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  async openPhoto(photoUrl: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PhotoViewerComponent,
      componentProps: { photoUrl, alt: this.restaurantName },
      cssClass: 'photo-viewer-modal',
    });
    await modal.present();
  }
}
