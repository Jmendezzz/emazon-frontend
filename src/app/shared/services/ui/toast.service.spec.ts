import { ToastService } from './toast.service';
import { Toast, ToastType } from 'src/app/domain/models/Toast';
import { TOAST_DURATION } from 'src/app/domain/utils/constants/Toast';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of toasts', () => {
    const toasts$ = service.getToastsObservable();
    expect(toasts$).toBeInstanceOf(Observable);
  });

  it('should add a new toast when showToast is called', () => {
    const mockToast: Toast = { message: 'Test toast', type: ToastType.SUCCESS };
    service.showToast(mockToast);

    service.getToastsObservable().subscribe((toasts) => {
      expect(toasts).toContain(mockToast);
    });
  });

  it('should remove the toast after TOAST_DURATION has passed', fakeAsync(() => {
    const mockToast: Toast = { message: 'Test toast', type: ToastType.SUCCESS };
    service.showToast(mockToast);

    tick(TOAST_DURATION);

    expect(service.getToasts).not.toContain(mockToast);
  }));

  it('should remove a toast when removeToast is called', () => {
    const mockToast: Toast = { message: 'Test toast', type: ToastType.SUCCESS };
    service.showToast(mockToast);

    service.getToastsObservable().subscribe((toasts) => {
      expect(toasts).toContain(mockToast);
    });

    service.removeToast(mockToast);

    service.getToastsObservable().subscribe((toasts) => {
      expect(toasts).not.toContain(mockToast);
    });
  });
});
