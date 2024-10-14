import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

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
  @Output() nameChanged = new EventEmitter<string>;

  constructor(private user: UserService, private toast: ToastService) {}

  openChangeNameModal(): void {
    console.log(this.user.getUserName())

    this.isChangeModalOpen = true;
  }

  closeChangeNameModal(): void {
    this.isChangeModalOpen = false;
  }

  onSubmitChangeName(): void {
    this.user.updateUserName(this.userChosenNewName)
      .subscribe({
        next: result => {
          console.log('Success', result);
          this.closeChangeNameModal()
          this.nameChanged.emit(this.userChosenNewName);
          this.toast.showToast({ message: 'Your username has been changed.', type: 'info' })
        },
        error: err => {
          console.error('Error updating username:', err);
        }
      });
  }

}
