import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline, logInOutline
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

  constructor(private router: Router, private authService: AuthService) {
    addIcons({
      personOutline, mailOutline, callOutline,
      pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline, logInOutline
    });
  }

  editProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
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