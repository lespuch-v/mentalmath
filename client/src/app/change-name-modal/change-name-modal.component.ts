import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-name-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './change-name-modal.component.html',
  styleUrl: './change-name-modal.component.css'
})
export class ChangeNameModalComponent {

  isChangeModalOpen: boolean = false;
  userChosenNewName!: string;

  constructor(private auth: AuthService, private user: UserService) {}

  openChangeNameModal(): void {
    console.log(this.user.getUserName())

    this.isChangeModalOpen = true;
  }

  closeChangeNameModal(): void {
    this.isChangeModalOpen = false;
  }

  onSubmitChangeName(): void {
    console.log(this.auth.currentUser.id);
    console.log(this.userChosenNewName);
    this.user.updateUserName(this.userChosenNewName)
      .subscribe({
        next: result => {
          console.log('Success', result);
        },
        error: err => {
          console.error('Error updating username:', err);
        }
      });
  }

}
