import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule,
  ValidationErrors, ValidatorFn, Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterLink],
})
export class RegisterPage {
  registerForm: FormGroup;
  mostrarPassword = false;
  mostrarConfirmarPassword = false;
  errorMessage = '';
  loading = false;
  registered = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {
    addIcons({ personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });

    this.registerForm = this.formBuilder.group(
      {
        nomeCompleto: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsIguaisValidator() }
    );
  }

  get nomeCompleto(): AbstractControl | null { return this.registerForm.get('nomeCompleto'); }
  get email(): AbstractControl | null { return this.registerForm.get('email'); }
  get password(): AbstractControl | null { return this.registerForm.get('password'); }
  get confirmarPassword(): AbstractControl | null { return this.registerForm.get('confirmarPassword'); }

  alternarPassword(): void { this.mostrarPassword = !this.mostrarPassword; }
  alternarConfirmarPassword(): void { this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword; }

  async criarConta(): Promise<void> {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMessage = '';
    try {
      const { nomeCompleto, email, password } = this.registerForm.value;
      await firstValueFrom(this.authService.register({ username: nomeCompleto, email, password }));
      await this.showSuccessAlert();
      this.router.navigateByUrl('/login');
    } catch (err: any) {
      if (err?.status === 409) {
        this.email?.setErrors({ emailTaken: true });
        this.email?.markAsTouched();
      } else {
        this.errorMessage = err?.error?.message ?? 'Erro ao criar conta.';
      }
    } finally {
      this.loading = false;
    }
  }

  private async showSuccessAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Conta criada',
      message: 'A sua conta foi criada com sucesso.',
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  private passwordsIguaisValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmarPassword = control.get('confirmarPassword')?.value;
      if (!password || !confirmarPassword) return null;
      return password === confirmarPassword ? null : { passwordsNaoCoincidem: true };
    };
  }
}