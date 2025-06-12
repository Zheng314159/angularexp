import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { LoaderService } from './loader.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  const loaderService = inject(LoaderService);

  if (req.url.includes('/login')) {
    return next(req); // 不加 token
  }

  // 检查 token 是否过期
  if (token && authService.isTokenExpired()) {
    authService.logout();
    router.navigate(['/login']);
    return next(req); // 不加 token，避免出现异常
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 如果未授权，尝试刷新 token
        if (error.status === 401) {
          loaderService.show(); // ⏳ 显示加载动画
          return from(authService.refreshTokenOnce()).pipe(
            switchMap((success) => {
              if (success) {
                loaderService.hide();
                const newToken = authService.getToken();
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`,
                  },
                });
                return next(retryReq);
              } else {
                authService.logout();  // token 可能被拉黑了
                return throwError(() => error);
              }
            }),
          );
        }

        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
