import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  [key: string]: unknown;
}
export interface TokenResponse {
  token: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private useLocal = false;
  private loginUrl = 'https://www.contemnewton.com/login';
  private tokenUrl = 'https://www.contemnewton.com/refresh';
  private tokenKey = 'jwt_token';
  private refreshKey = 'refresh_token';
  private isRefreshing = false;
  private refreshQueue: (() => void)[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // 自动识别哪个有 token，优先 localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem('jwt_token') && sessionStorage.getItem('jwt_token')) {
        this.useLocal = false;
      }
    }
  }

  getStorage(): Storage | null {
    if (typeof window !== 'undefined' && window.localStorage && window.sessionStorage) {
      return this.useLocal ? localStorage : sessionStorage;
    }
    return null;
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials);
  }

  saveTokens(token: string, refreshToken: string, remember = true): void {
    this.useLocal = remember;
    const storage = this.getStorage();
    if (!storage) {
      console.warn('Storage is not available');
      return;
    }
    storage.setItem(this.tokenKey, token);
    storage.setItem(this.refreshKey, refreshToken);
  }

  getToken(): string | null {
    const storage = this.getStorage();
    if (!storage) {
      console.warn('Storage is not available');
      return null;
    }
    return storage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    const storage = this.getStorage();
    if (!storage) {
      console.warn('Storage is not available');
      return null;
    }
    return storage.getItem(this.refreshKey);
  }

  logout(): void {
  const storage = this.getStorage();
    if (!storage) {
      console.warn('Storage is not available');
      return;
    }
      storage.removeItem(this.tokenKey);
      storage.removeItem(this.refreshKey);
      this.router.navigate(['/login']);

  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      return Date.now() >= exp * 1000; // 单位转换为毫秒
    } catch (error) {
      console.error('Token 解析失败:', error);
      return true; // 无效 token，认为已过期
    }
  }
  async refreshToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res: TokenResponse = await firstValueFrom(
        this.http.post<TokenResponse>(this.tokenUrl, {
          refreshToken,
        }),
      );
      if (res?.token && res?.refreshToken) {
        this.saveTokens(res.token, res.refreshToken);
        return true;
      }
    } catch (err) {
      console.warn('刷新失败', err);
    }

    this.logout();
    return false;
  }
  async ensureAuthenticated(): Promise<boolean> {
    if (this.isTokenExpired()) {
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }

  async refreshTokenOnce(): Promise<boolean> {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshQueue.push(() => resolve(true));
      });
    }

    this.isRefreshing = true;

    try {
      const res: TokenResponse = await firstValueFrom(
        this.http.post<TokenResponse>(this.tokenUrl, {
          refreshToken: this.getRefreshToken(),
        }),
      );
      if (res?.token && res?.refreshToken) {
        this.saveTokens(res.token, res.refreshToken);
        this.refreshQueue.forEach((cb) => cb());
        this.refreshQueue = [];
        return true;
      }
    } catch {
      this.logout();
    } finally {
      this.isRefreshing = false;
    }

    return false;
  }
}
