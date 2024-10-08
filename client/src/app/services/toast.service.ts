import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<Toast>();
  toastState$ = this.toastSubject.asObservable();

  showToast(toast: Toast): void {
    this.toastSubject.next(toast)
  }
}
