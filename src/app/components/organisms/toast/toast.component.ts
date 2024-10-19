import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/domain/models/Toast';
import {
  TOAST_CLASSES_MAP,
  TOAST_ICON_MAP,
  TOAST_INFORMER_CLASSES_MAP,
} from 'src/app/domain/utils/constants/Toast';
import { ToastService } from 'src/app/shared/services/ui/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private readonly toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToastsObservable().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: Toast) {
    this.toastService.removeToast(toast);
  }

  getToastClass(toast: Toast): string {
    return TOAST_CLASSES_MAP.get(toast.type) ?? '';
  }

  getToastInformerClass(toast: Toast): string {
    return TOAST_INFORMER_CLASSES_MAP.get(toast.type) ?? '';
  }

  getToastIcon(toast: Toast): string {
    return TOAST_ICON_MAP.get(toast.type) ?? '';
  }
}
