import { Component, ViewChild } from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggler/dark-mode-toggle.component';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { RouterModule } from '@angular/router';
import { RegisterModalComponent } from "../register-modal/register-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DarkModeToggleComponent,
    LoginModalComponent,
    RouterModule,
    RegisterModalComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('loginModal') loginModal!: LoginModalComponent;
  @ViewChild('registerModal') registerModal!: RegisterModalComponent;

  openLoginModal(): void {
    this.loginModal.openModal();
  }

  openRegisterModal(): void {
    this.registerModal.openRegisterModal();
  }

}
