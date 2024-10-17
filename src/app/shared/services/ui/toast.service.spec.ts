import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { Toast, ToastType } from 'src/app/domain/models/Toast';
import { BehaviorSubject } from 'rxjs';
import { TOAST_DURATION } from 'src/app/domain/utils/constants/Toast';

jest.useFakeTimers();

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable from getToasts()', () => {
    const toastsObservable = service.getToasts();
    expect(toastsObservable).toBeInstanceOf(BehaviorSubject);
  });

  it('should add a toast when showToast is called', () => {
    const toast: Toast = { message: 'Test toast', type: ToastType.SUCCESS };

    service.getToasts().subscribe((toasts) => {
      expect(toasts).toContain(toast);
    });

    service.showToast(toast);

    expect(service['toasts']).toContain(toast);
  });

  it('should remove the toast when removeToast is called', () => {
    const toast: Toast = { message: 'Test toast', type: ToastType.SUCCESS };

    service.showToast(toast);

    service.removeToast(toast);

    expect(service['toasts']).not.toContain(toast);

    service.getToasts().subscribe((toasts) => {
      expect(toasts).not.toContain(toast);
    });
  });

  it('should remove the toast automatically after TOAST_DURATION', () => {
    const toast: Toast = { message: 'Auto remove toast', type: ToastType.INFO };

    service.showToast(toast);

    expect(service['toasts']).toContain(toast);

    jest.advanceTimersByTime(TOAST_DURATION);

    expect(service['toasts']).not.toContain(toast);
  });

  it('should call removeToast after the timeout', () => {
    const toast: Toast = { message: 'Timeout toast', type: ToastType.WARNING };

    const spyRemoveToast = jest.spyOn(service, 'removeToast');
    service.showToast(toast);

    jest.advanceTimersByTime(TOAST_DURATION);

    expect(spyRemoveToast).toHaveBeenCalledWith(toast);
  });
});
