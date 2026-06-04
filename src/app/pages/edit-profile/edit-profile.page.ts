import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  locationOutline,
  mailOutline,
  personOutline,
  arrowBackOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonButtons,
  ],
})

export class EditProfilePage {
  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    
     addIcons({
        personOutline,
        mailOutline,
        callOutline,
        locationOutline,
        arrowBackOutline,
    });

    

    this.profileForm = this.formBuilder.group({
      nome: ['João Silva'],
      email: ['joao.silva@email.com'],
      telefone: ['912 345 678'],
      cidade: ['Lisboa'],
    });
  }

  guardarPerfil(): void {
    console.log('Alterações simuladas:', this.profileForm.value);
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
    }
}