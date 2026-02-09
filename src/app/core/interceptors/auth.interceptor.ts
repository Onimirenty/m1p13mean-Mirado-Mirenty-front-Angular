import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NO_AUTH } from './tokens';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Si la requête demande explicitement NO_AUTH => on ne met pas le header
  if (req.context.get(NO_AUTH)) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.token; // utilise le helper
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(req);
};

