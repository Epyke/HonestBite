import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { RestaurantsService } from 'src/app/services/restaurants/restaurants';
import { CategoriesService } from 'src/app/services/categories/categories';
import { Category } from 'src/app/models/category.model';

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
export class AddRestaurantPage implements OnInit {
  form: FormGroup;
  submitted = false;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private router: Router, private categoriesService: CategoriesService) {
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

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Novo restaurante:', this.form.value);
    }
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
  }
}
