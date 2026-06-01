import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonContent, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline,
  pencilOutline, logOutOutline, chatbubbleEllipsesOutline
} from 'ionicons/icons';
import { CustomToolbarComponent } from '../components/custom-toolbar/custom-toolbar.component';

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
    IonHeader, IonToolbar, IonContent, IonIcon, IonButton,
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
      pencilOutline, logOutOutline, chatbubbleEllipsesOutline
    });
  }

  editProfile(): void {
    // Navegar para página de edição (a implementar futuramente)
    console.log('Editar perfil');
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}