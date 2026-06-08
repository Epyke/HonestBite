import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonContent, IonIcon,
  IonInput, IonItem, IonList, IonSelect, IonSelectOption,
  IonTextarea, IonLabel,
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
    IonButton, IonButtons, IonSelect, IonSelectOption, IonTextarea, IonLabel,
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

  submit(): void {
  this.submitted = true;
  if (!this.form.valid) return;

  const v = this.form.value;

  const schedule: Schedule[] = [];
  if (v.scheduleWeekdays)
    ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].forEach(day =>
      schedule.push({ day, hours: v.scheduleWeekdays })
    );
  if (v.scheduleWeekends)
    ['Sábado', 'Domingo'].forEach(day =>
      schedule.push({ day, hours: v.scheduleWeekends })
    );

  this.restaurantsService.add({
    name: v.name,
    category: v.category,
    city: v.city,
    mapsUrl: v.address || '',
    avgPrice: v.avgPrice,
    description: v.description,
    schedule,
    cover: this.coverPreview || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    menuPhotos: this.menuPreviews,
  });

  this.router.navigate(['/tabs/tab1']);
}

}
