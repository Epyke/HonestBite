import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline
} from 'ionicons/icons';
import { CustomToolbarComponent } from '../components/custom-toolbar/custom-toolbar.component';
import { AuthService } from '../services/auth/auth';
import { ProfileService } from '../services/profile/profile';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  description: string;
  initials: string;
  memberSince: string;
}

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
  user: UserProfile = {
    name: '',
    email: '',
    phone: '',
    description: '',
    initials: '',
    memberSince: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    addIcons({
      personOutline, mailOutline, callOutline,
      pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline
    });
  }

  async ionViewWillEnter(): Promise<void> {
    await this.authService.loadSession();
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authService.currentUser;

    if (!currentUser) {
      this.user = {
        name: '',
        email: '',
        phone: '',
        description: '',
        initials: '',
        memberSince: '',
      };
      return;
    }

 const savedProfile = this.profileService.getProfile();

if (savedProfile) {
  this.user = {
    name: savedProfile.name,
    email: savedProfile.email,
    phone: savedProfile.phone,
    description: savedProfile.description,
    initials: this.getInitials(savedProfile.name || savedProfile.email),
    memberSince: 'Conta ativa',
  };
  return;
}

    const name = currentUser.user_metadata?.['username'] ?? '';
    const email = currentUser.email ?? '';

    this.user = {
      name,
      email,
      phone: '',
      description: '',
      initials: this.getInitials(name || email),
      memberSince: 'Conta ativa',
    };
  }

  getInitials(value: string): string {
    if (!value) {
      return '';
    }

    return value
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  openAddRestaurant(): void {
    this.router.navigate(['/add-restaurant']);
  }
}