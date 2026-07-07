import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  imageOutline,
  listOutline,
  locationOutline,
  pricetagOutline,
  restaurantOutline,
  timeOutline,
} from 'ionicons/icons';
import { Restaurant, Restaurants } from 'src/app/services/restaurants/restaurants';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
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
    IonSelect,
    IonSelectOption,
    IonTextarea,
  ],
})
export class AddRestaurantPage {
  form: FormGroup;
  submitted = false;
  coverPreview = '';
  menuPreview = '';
  categories = this.restaurants.categories;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private restaurants: Restaurants
  ) {
    addIcons({
      restaurantOutline,
      locationOutline,
      pricetagOutline,
      arrowBackOutline,
      timeOutline,
      listOutline,
      imageOutline,
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      city: ['', Validators.required],
      address: [''],
      avgPrice: ['', Validators.required],
      description: ['', Validators.required],
      scheduleWeekdays: [''],
      scheduleWeekends: [''],
      cover: [''],
      menuPhoto: [''],
    });
  }

  onImageSelected(event: Event, type: 'cover' | 'menu'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result as string;

      if (type === 'cover') {
        this.coverPreview = imageData;
        this.form.patchValue({ cover: imageData });
      } else {
        this.menuPreview = imageData;
        this.form.patchValue({ menuPhoto: imageData });
      }
    };

    reader.readAsDataURL(file);
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const mapsQuery = encodeURIComponent(`${value.address || ''}, ${value.city || ''}`);

    const weekdayHours = value.scheduleWeekdays || 'Fechado';
    const weekendHours = value.scheduleWeekends || 'Fechado';

    const newRestaurant: Restaurant = {
      id: `created-${Date.now()}`,
      name: value.name,
      category: value.category,
      city: value.city,
      avgPrice: value.avgPrice,
      description: value.description,
      cover: value.cover || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
      logo: 'assets/icon/favicon.png',
      distance: 'Novo',
      global: 0,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
      menuPhotos: value.menuPhoto ? [value.menuPhoto] : [],
      reviews: [],
      schedule: [
        { day: 'Segunda', hours: weekdayHours },
        { day: 'Terça', hours: weekdayHours },
        { day: 'Quarta', hours: weekdayHours },
        { day: 'Quinta', hours: weekdayHours },
        { day: 'Sexta', hours: weekdayHours },
        { day: 'Sábado', hours: weekendHours },
        { day: 'Domingo', hours: weekendHours },
      ],
    };

    this.restaurants.addRestaurant(newRestaurant);
    this.router.navigate(['/tabs/tab1']);
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
  }
}