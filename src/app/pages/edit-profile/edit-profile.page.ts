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
  arrowBackOutline,
  callOutline,
  chatbubbleEllipsesOutline,
  locationOutline,
  mailOutline,
  personOutline,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { ProfileService } from '../../services/profile/profile';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    addIcons({
      personOutline,
      mailOutline,
      callOutline,
      locationOutline,
      arrowBackOutline,
      chatbubbleEllipsesOutline,
    });

    this.profileForm = this.formBuilder.group({
      nome: [''],
      email: [''],
      telefone: [''],
      cidade: [''],
      descricao: [''],
    });
  }

  async ionViewWillEnter(): Promise<void> {
    await this.authService.loadSession();
    this.carregarDadosUtilizador();
  }

  carregarDadosUtilizador(): void {
    const savedProfile = this.profileService.getProfile();

    if (savedProfile) {
      this.profileForm.patchValue({
        nome: savedProfile.name,
        email: savedProfile.email,
        telefone: savedProfile.phone,
        cidade: savedProfile.city,
        descricao: savedProfile.description,
      });
      return;
    }

    const currentUser = this.authService.currentUser;

    if (!currentUser) {
      this.profileForm.reset({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        descricao: '',
      });
      return;
    }

    this.profileForm.patchValue({
      nome: currentUser.user_metadata?.['username'] ?? '',
      email: currentUser.email ?? '',
      telefone: '',
      cidade: '',
      descricao: '',
    });
  }

  guardarPerfil(): void {
    this.profileService.saveProfile({
      name: this.profileForm.value.nome ?? '',
      email: this.profileForm.value.email ?? '',
      phone: this.profileForm.value.telefone ?? '',
      city: this.profileForm.value.cidade ?? '',
      description: this.profileForm.value.descricao ?? '',
    });

    this.router.navigate(['/tabs/tab4']);
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
  }
}