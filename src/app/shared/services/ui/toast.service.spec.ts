import { fakeAsync, TestBed, tick,  } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
import { Toast, ToastType } from 'src/app/domain/models/Toast';
import { TOAST_DURATION } from 'src/app/domain/utils/constants/Toast';

describe('ToastService', () => {
  let service: ToastService;

  const mockToast: Toast = {
    message: 'Test toast',
    type: ToastType.SUCCESS
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of toasts', () => {
    const toasts$ = service.getToasts();
    expect(toasts$).toBeInstanceOf(BehaviorSubject);
  });

  it('should add a new toast when showToast is called', () => {
    service.showToast(mockToast);
    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts).toContain(mockToast);
    });
  });

  it('should remove the toast after TOAST_DURATION has passed', fakeAsync(() => {
    service.showToast(mockToast);
    service.getToasts().subscribe(toasts => {
      expect(toasts).toContain(mockToast); 
    });

    tick(TOAST_DURATION);

    service.getToasts().subscribe(toasts => {
      expect(toasts).not.toContain(mockToast); 
      expect(toasts.length).toBe(0);
    });
  }));

  it('should manually remove a toast when removeToast is called', () => {
    service.showToast(mockToast);
    service.removeToast(mockToast);
    service.getToasts().subscribe(toasts => {
      expect(toasts).not.toContain(mockToast); 
    });
  });

  it('should not remove a toast that is not in the list', () => {
    const anotherToast: Toast = {
      message: 'Another toast',
      type: ToastType.ERROR
    };

    service.showToast(mockToast);
    service.removeToast(anotherToast); 
    service.getToasts().subscribe(toasts => {
      expect(toasts).toContain(mockToast); 
      expect(toasts.length).toBe(1); 
    });
  });
});
