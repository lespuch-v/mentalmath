import { Component, ViewChild } from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggler/dark-mode-toggle.component';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DarkModeToggleComponent,
    LoginModalComponent,
    RouterModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('loginModal') loginModal!: LoginModalComponent;

  openLoginModal(): void {
    this.loginModal.openModal();
  }

}
