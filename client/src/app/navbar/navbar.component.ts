import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggler/dark-mode-toggle.component';
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { RouterModule } from '@angular/router';
import { RegisterModalComponent } from "../register-modal/register-modal.component";
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DarkModeToggleComponent,
    LoginModalComponent,
    RouterModule,
    RegisterModalComponent,
    NgIf,
    AsyncPipe
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('loginModal') loginModal!: LoginModalComponent;
  @ViewChild('registerModal') registerModal!: RegisterModalComponent;

  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService, private toast: ToastService ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngAfterViewInit(): void {
    // Add click listener to close dropdown when clicked outside
    document.addEventListener('click', (event: Event) => {
      const detailsElement = document.getElementById('detailsDropdown') as HTMLDetailsElement;
      
      if (detailsElement && detailsElement.hasAttribute('open')) {
        const target = event.target as HTMLElement;
        if (!detailsElement.contains(target)) {
          detailsElement.removeAttribute('open');
        }
      }
    });
  }

  openLoginModal(): void {
    this.loginModal.openModal();
  }

  openRegisterModal(): void {
    this.registerModal.openRegisterModal();
  }

  logout(): void {
    this.authService.logout();
    this.toast.showToast({message: 'You’re logged out.', type: 'info'})
    console.log('User logged out');
  }
}
