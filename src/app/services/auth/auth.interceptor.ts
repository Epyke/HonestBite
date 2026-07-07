import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'hb_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthCall = req.url.includes('/users/login') || req.url.includes('/users/register');
  const token = localStorage.getItem(TOKEN_KEY);

  if (token && !isAuthCall) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};