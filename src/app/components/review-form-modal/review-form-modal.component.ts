import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonIcon,
  ModalController, AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  star, starOutline, closeOutline,
  personOutline, checkmarkOutline, restaurantOutline,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-review-form-modal',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonIcon,
  ],
  templateUrl: './review-form-modal.component.html',
  styleUrls: ['./review-form-modal.component.scss'],
})
export class ReviewFormModalComponent {
  @Input() restaurantId!: string;
  @Input() restaurantName!: string;

  stars = [1, 2, 3, 4, 5];
  rating = 0;
  comment = '';
  userName = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthService,
  ) {
    addIcons({ star, starOutline, closeOutline, personOutline, checkmarkOutline, restaurantOutline });
    this.userName = this.authService.currentUser?.user_metadata?.['username'] ?? '';
  }

  get ratingLabel(): string {
    return ['', 'Muito mau', 'Mau', 'Razoável', 'Bom', 'Excelente'][this.rating];
  }

  get isValid(): boolean {
    return this.rating > 0 && this.comment.trim().length > 0;
  }

  setRating(value: number): void {
    this.rating = value;
  }

  async submit(): Promise<void> {
    if (!this.isValid) return;

    const alert = await this.alertCtrl.create({
      header: 'Publicar avaliação?',
      message: `${this.ratingLabel} · ${this.restaurantName}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss(
              { userName: this.userName.trim(), rating: this.rating, comment: this.comment.trim() },
              'confirm',
            );
          },
        },
      ],
    });

    await alert.present();
  }

  dismiss(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
