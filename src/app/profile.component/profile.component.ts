import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <h2>欢迎回来，已登录用户！</h2>
    <button (click)="logout()">退出登录</button>
  `
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
