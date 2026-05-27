import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class RegisterPage {
  registerForm: FormGroup;
  mostrarPassword = false;
  mostrarConfirmarPassword = false;

  constructor(private formBuilder: FormBuilder) {
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

  get nomeCompleto(): AbstractControl | null {
    return this.registerForm.get('nomeCompleto');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get confirmarPassword(): AbstractControl | null {
    return this.registerForm.get('confirmarPassword');
  }

  alternarPassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  alternarConfirmarPassword(): void {
    this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword;
  }

  criarConta(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmarPassword, ...dadosRegisto } = this.registerForm.value;
    console.log('Dados de registo:', dadosRegisto);
  }

  private passwordsIguaisValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmarPassword = control.get('confirmarPassword')?.value;

      if (!password || !confirmarPassword) {
        return null;
      }

      return password === confirmarPassword ? null : { passwordsNaoCoincidem: true };
    };
  }
}