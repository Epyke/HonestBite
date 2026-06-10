import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline
} from 'ionicons/icons';
import { CustomToolbarComponent } from '../../components/custom-toolbar/custom-toolbar.component';

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
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '+351 912 345 678',
    description: 'Apaixonada por gastronomia portuguesa e sempre à procura de novos sabores autênticos.',
    initials: 'MS',
    memberSince: 'Membro desde Janeiro 2024',
  };

  constructor(private router: Router) {
    addIcons({
      personOutline, mailOutline, callOutline,
      pencilOutline, logOutOutline, chatbubbleEllipsesOutline, addOutline, storefrontOutline
    });
  }

 editProfile(): void {
  this.router.navigateByUrl('/edit-profile');
}

  logout(): void {
    this.router.navigateByUrl('/login');
  }

  openAddRestaurant(): void {
  this.router.navigate(['/add-restaurant']);
  }
}