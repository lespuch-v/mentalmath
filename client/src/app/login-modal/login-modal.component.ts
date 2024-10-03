import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    // handle login logic here
    console.log('User:', this.user);
  }

  onForgotPassword(): void {
    // handle forgot password logic
    console.log('Forgot password clicked');
    
  }

}
