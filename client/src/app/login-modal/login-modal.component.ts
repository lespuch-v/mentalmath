import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  isModalOpen: boolean = false;

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    console.log(this.user)
    this.authService.login(this.user).subscribe({
      next: () => {
        console.log('User successfully logged in');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    })
  }

  onForgotPassword(): void {
    // handle forgot password logic
    console.log('Forgot password clicked');
  }
}
