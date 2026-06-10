import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonContent, IonIcon,
  IonInput, IonItem, IonList, IonSelect, IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  restaurantOutline, locationOutline, pricetagOutline,
  arrowBackOutline, timeOutline, listOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonCard, IonList, IonItem, IonInput, IonIcon,
    IonButton, IonButtons, IonSelect, IonSelectOption, IonTextarea,
  ],
})
export class AddRestaurantPage {
  form: FormGroup;
  submitted = false;

  categories = [
    'Tradicional', 'Petiscos', 'Grelhados',
    'Marisqueira', 'Regional', 'Italiana', 'Japonesa', 'Vegana', 'Outro',
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    addIcons({ restaurantOutline, locationOutline, pricetagOutline, arrowBackOutline, timeOutline, listOutline });

    this.form = this.fb.group({
      name:              ['', Validators.required],
      category:          ['', Validators.required],
      city:              ['', Validators.required],
      address:           [''],
      avgPrice:          ['', Validators.required],
      description:       ['', Validators.required],
      scheduleWeekdays:  [''],
      scheduleWeekends:  [''],
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Novo restaurante:', this.form.value);
      // TODO: call your restaurants service to save
    }
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
  }
}
