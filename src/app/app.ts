import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader.component/loader.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}
  protected title = 'RxjsDemo';
  ngOnInit() {
  const token = this.authService.getToken();
  if (token && !this.authService.isTokenExpired()) {
    // 自动恢复状态
  } else {
    this.authService.logout();
  }
}
}
