import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  errorMessage = '';
  loading = false;

  async fazerLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.router.navigateByUrl('/');
    } catch (err: any) {
      this.errorMessage = 'E-mail ou palavra-passe incorretos.';
    } finally {
      this.loading = false;
    }
  }
}