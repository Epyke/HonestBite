import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar,
  AlertController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, chatbubbleEllipsesOutline, addOutline, logInOutline
} from 'ionicons/icons';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';
import { AuthService } from 'src/app/services/auth/auth';
import { CurrentUser } from 'src/app/models/user.model';
import { UserSession } from 'src/app/services/auth/user-session';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar,
    CustomToolbarComponent,
  ],
})
export class Tab4Page {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController,
  ) {
    addIcons({
      personOutline, mailOutline, callOutline,
      pencilOutline, chatbubbleEllipsesOutline, addOutline, logInOutline
    });
  }

  editProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  async confirmLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Terminar sessão?',
      message: 'Vai precisar de iniciar sessão novamente para aceder à sua conta.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', role: 'confirm', handler: () => this.logout() },
      ],
    });
    await alert.present();
  }

  private logout(): void {
    UserSession.clear();
    this.router.navigateByUrl('/');
  }

  register(): void {
    this.router.navigateByUrl('/register');
  }

  openAddRestaurant(): void {
    this.router.navigate(['/add-restaurant']);
  }

  get user(): CurrentUser | null { return UserSession.get(); }
  get isLoggedIn(): boolean { return UserSession.isLoggedIn; }
  get memberSince(): string {return this.user?.createdAt?.slice(0, 10).split('-').reverse().join('/') ?? '';}
}