import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from 'src/app/domain/models/Toast';
import { TOAST_DURATION } from 'src/app/domain/utils/constants/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);

  get getToasts() {
    return this.toasts;
  }

  getToastsObservable() {
    return this.toastsSubject.asObservable();
  }

  showToast(toast: Toast) {
    this.toasts = [...this.toasts, toast];
    this.toastsSubject.next(this.toasts);

    setTimeout(() => {
      this.removeToast(toast);
    }, TOAST_DURATION);
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastsSubject.next(this.toasts);
  }

  constructor() { }
}
