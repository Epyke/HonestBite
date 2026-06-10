import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'restaurant/:id',
    loadComponent: () => import('./pages/restaurant-detail/restaurant-detail.page').then((m) => m.RestaurantDetailPage),
  },
  {
  path: 'edit-profile',
  loadComponent: () =>
    import('./pages/edit-profile/edit-profile.page').then((m) => m.EditProfilePage),
},
  {
    path: 'add-restaurant',
    loadComponent: () => import('./pages/add-restaurant/add-restaurant.page').then( m => m.AddRestaurantPage)
  },
];