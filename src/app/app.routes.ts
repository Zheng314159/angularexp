import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { ProfileComponent } from './profile.component/profile.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',

    loadComponent: () =>
      import('./components/homePage/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'message',
    loadComponent: () =>
      import('./components/messagePage/message.component').then((m) => m.MessageComponent),
  },
  {
    path: 'page3',
    loadComponent: () => import('./components/page3/page3.component').then((m) => m.Page3Component),
  },
  {
    path: 'page4',
    loadComponent: () => import('./components/page4/page4.component').then((m) => m.Page4Component),
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./test-rx-js/test-rx-js').then((m) => m.TestRxJS),
  },
  {
    path: 'test',
    loadComponent: () => import('./test/test').then((m) => m.Test),
    canActivate: [authGuard], // 👈 路由守卫启用
  },
  {
    path: 'login',
    loadComponent: () => import('./login.component/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard], // 👈 路由守卫启用
  },
];
