import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonContent, IonIcon,
  IonInput, IonItem, IonList, IonSelect, IonSelectOption,
  IonTextarea, IonToggle, IonNote, IonDatetime, IonDatetimeButton, IonModal,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  restaurantOutline, locationOutline, pricetagOutline,
  arrowBackOutline, timeOutline, listOutline,
  addOutline, trashOutline, imageOutline, cloudUploadOutline, closeCircle,
} from 'ionicons/icons';
import { CategoriesService } from 'src/app/services/categories/categories';
import { Category } from 'src/app/models/category.model';
import { DaySchedule } from 'src/app/models/schedule.model';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    IonContent, IonCard, IonList, IonItem, IonInput, IonIcon,
    IonButton, IonButtons, IonSelect, IonSelectOption, IonTextarea, IonToggle, IonNote,
    IonDatetime, IonDatetimeButton, IonModal
  ]
})

export class AddRestaurantPage implements OnInit {
  form: FormGroup;
  submitted = false;
  submitError = '';
  categories: Category[] = [];
  coverFile: File | null = null;
  coverPreview: string | null = null;
  menuItems: { file: File; preview: string }[] = [];
  schedule: DaySchedule[] = [
  { day: 'mon', label: 'Segunda', isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T22:00:00' }] },
  { day: 'tue', label: 'Terça',   isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T22:00:00' }] },
  { day: 'wed', label: 'Quarta',  isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T22:00:00' }] },
  { day: 'thu', label: 'Quinta',  isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T22:00:00' }] },
  { day: 'fri', label: 'Sexta',   isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T23:00:00' }] },
  { day: 'sat', label: 'Sábado',  isOpen: true,  intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T23:00:00' }] },
  { day: 'sun', label: 'Domingo', isOpen: false, intervals: [{ open: '2024-01-01T12:00:00', close: '2024-01-01T22:00:00' }] },
  ];

  constructor(private fb: FormBuilder, private router: Router, private categoriesService: CategoriesService, private restaurantService: RestaurantsService) {
    addIcons({restaurantOutline, locationOutline, pricetagOutline, arrowBackOutline, timeOutline, listOutline, addOutline, trashOutline, imageOutline, cloudUploadOutline, closeCircle});

    this.form = this.fb.group({
      name:              ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      category:          ['', Validators.required],
      city:              ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      address:           ['', Validators.maxLength(120)],
      avgPrice:          ['', [Validators.required, Validators.min(0.01), Validators.max(1000), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description:       ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  /** Returns true when a field should show its error (invalid + touched or after submit). */
  showError(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  /** First validation error message for a field, or empty string if valid. */
  errorFor(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.errors) return '';
    const errors = control.errors;
    if (errors['required'])  return 'Campo obrigatório.';
    if (errors['minlength']) return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['maxlength']) return `Máximo de ${errors['maxlength'].requiredLength} caracteres.`;
    if (errors['min'])       return `O valor tem de ser no mínimo ${errors['min'].min}.`;
    if (errors['max'])       return `O valor tem de ser no máximo ${errors['max'].max}.`;
    if (errors['pattern'])   return 'Introduz um valor válido.';
    return 'Valor inválido.';
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  toggleDay(d: DaySchedule): void {
  d.isOpen = !d.isOpen;
  } 

  addInterval(d: DaySchedule): void {
  if (d.intervals.length < 2) {
      d.intervals.push({ open: '2024-01-01T19:00:00', close: '2024-01-01T23:00:00' });
    }
  }

  /** Extract a zero-padded "HH:mm" from any ion-datetime value (ISO datetime or plain time). */
  timeLabel(value: string): string {
    if (!value) return '';
    const match = value.match(/(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '';
  }

  removeInterval(d: DaySchedule, index: number): void {
    d.intervals.splice(index, 1);
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab4']);
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.coverFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.coverPreview = reader.result as string);
    reader.readAsDataURL(file);

    input.value = '';
  }

  removeCover(): void {
    this.coverFile = null;
    this.coverPreview = null;
  }

  onMenusSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () =>
        this.menuItems.push({ file, preview: reader.result as string });
      reader.readAsDataURL(file);
    }

    input.value = '';
  }

  removeMenu(index: number): void {
    this.menuItems.splice(index, 1);
  }

  submit(): void {
  this.submitted = true;
  this.submitError = '';
  this.form.markAllAsTouched();

  const scheduleInvalid = this.schedule.some(d =>
    d.isOpen && d.intervals.some(i => this.timeLabel(i.open) >= this.timeLabel(i.close)));

  if (!this.form.valid || scheduleInvalid || !this.coverFile) {
    if (!this.coverFile) {
      this.submitError = 'A capa do restaurante é obrigatória.';
    } else if (scheduleInvalid) {
      this.submitError = 'Verifica o horário: a hora de fecho tem de ser depois da abertura.';
    } else {
      this.submitError = 'Preenche todos os campos obrigatórios corretamente.';
    }
    return;
  }

  const { name, category, city, address, avgPrice, description } = this.form.value;

  const data = {
    name,
    categoryIds: category != null && category !== '' ? [category] : [],
    address: {
      city,
      street: address,   // the "Morada" field
    },
    avgPrice: Number(avgPrice),
    description,
    opHours: this.schedule.map(d => ({
      day: d.label,
      isClosed: !d.isOpen,
      intervals: d.isOpen
        ? d.intervals
            .map(i => ({ open: this.timeLabel(i.open), close: this.timeLabel(i.close) }))
            .filter(i => i.open !== '' && i.close !== '')
        : [],
    })),
  };

  const menus = this.menuItems.map(m => m.file);

  this.restaurantService.create(data, this.coverFile, menus).subscribe({
      next: (res) => {
        this.router.navigate(['/tabs/tab4']);
      },
      error: (err) => {
        console.error('Erro ao criar restaurante:', err);
        this.submitError = 'Ocorreu um erro ao criar o restaurante. Tenta novamente.';
      },
    });
  }

}
