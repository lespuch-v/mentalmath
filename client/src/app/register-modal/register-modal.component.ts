import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  isRegisterModalOpen: boolean = false;
  registerUser = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  constructor(){}

  closeRegisterModal(): void {
    this.isRegisterModalOpen = false;
  }

  openRegisterModal(): void {
    this.isRegisterModalOpen = true;
  }

  onRegisterSubmit(): void {
  }

}
