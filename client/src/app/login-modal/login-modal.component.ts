import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  isModalOpen: boolean = false;
  errorMessage: string = '';

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private toast: ToastService) {}

  openLoginModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe({
      next: () => {
        console.log('User successfully logged in');
        this.toast.showToast({message: 'You\'ve successfully logged in. Enjoy your session!', type: 'success'})
        this.closeModal();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed:', err);
        if (err.status === 401){
          this.errorMessage = 'Invalid email or password. Please try again.'
        }else{
          this.errorMessage = 'An error occurred. Please try again later.'
          this.toast.showToast({message: 'Something went wrong', type:'error'})
        }
      }
    })
  }

  onForgotPassword(): void {
    // handle forgot password logic
    console.log('Forgot password clicked');this.toast.showToast({message: 'Not implemented ❌!', type:'warning'})
  }
}
