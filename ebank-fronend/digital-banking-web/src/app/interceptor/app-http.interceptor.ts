import { AuthService } from './../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq).pipe(
      catchError(err=>{
        if(err.status===401){
          authService.logout();
        }
        return throwError(err.message)
      })
    );
  }

  return next(req);
};
