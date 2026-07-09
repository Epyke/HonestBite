import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterLink],
})
export class LoginPage {
  loginForm: FormGroup;
  mostrarPassword = false;
  errorMessage = '';
  loading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
      addIcons({ mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  alternarPassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get emailError(): string {
  const c = this.email;
  if (c?.hasError('required')) return 'Este campo é obrigatório.';
  if (c?.hasError('email'))    return 'Introduz um e-mail válido.';
  return '';
  }

  async fazerLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    try {
      const { email, password } = this.loginForm.value;
      await firstValueFrom(this.authService.login({ email, password }));
      this.router.navigateByUrl('/');
    } catch (err: any) {
      this.errorMessage = 'E-mail ou palavra-passe incorretos.';
    } finally {
      this.loading = false;
    }
  }
}