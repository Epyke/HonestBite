import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterLink],
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  recuperar(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    console.log('Pedido de recuperação de password:', this.forgotForm.value);
  }
}