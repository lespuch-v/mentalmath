import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../services/toast.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe((toast) => {
      this.addToast(toast);
    })
  }

  addToast(toast: Toast) {
    this.toasts.push(toast);
    if (toast.duration !== 0) {
      setTimeout(() => this.removeToast(toast), toast.duration || 3000);
    }
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  getAlertClass(type: string) {
    return {
      'alert-info': type === 'info',
      'alert-success': type === 'success',
      'alert-warning': type === 'warning',
      'alert-error': type === 'error',
    };
  }
}
