import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ToastComponent } from '../../toast/toast.component';

@Component({
  selector: 'app-centered-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `
    <div class="min-h-screen">
      <app-navbar></app-navbar>
      <main class="flex items-center justify-center h-[calc(100vh-64px)]">
        <router-outlet></router-outlet>
      </main>
      <app-toast></app-toast>
    </div>
  `,
})
export class CenteredLayoutComponent {}
