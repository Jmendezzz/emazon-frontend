import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ToastComponent } from './toast.component';
import { Toast, ToastType } from '@/domain/models/Toast';
import { ToastService } from '@/shared/services/ui/toast.service';
import { TOAST_CLASSES_MAP, TOAST_ICON_MAP, TOAST_INFORMER_CLASSES_MAP } from '@/domain/utils/constants/Toast';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastServiceMock: any;

  const mockToasts: Toast[] = [
    { message: 'Test Toast 1', type: ToastType.SUCCESS },
    { message: 'Test Toast 2', type: ToastType.ERROR },
  ];

  beforeEach(async () => {
    toastServiceMock = {
      getToastsObservable: jest.fn().mockReturnValue(of(mockToasts)),
      removeToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: ToastService, useValue: toastServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toasts on init and set toasts', () => {
    component.ngOnInit();
    expect(toastServiceMock.getToastsObservable).toHaveBeenCalled();
    expect(component.toasts).toEqual(mockToasts);
  });

  it('should handle empty toasts array from service', () => {
    toastServiceMock.getToastsObservable.mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.toasts.length).toBe(0);
  });

  it('should remove a toast when removeToast is called', () => {
    const toastToRemove = mockToasts[0];
    component.removeToast(toastToRemove);
    expect(toastServiceMock.removeToast).toHaveBeenCalledWith(toastToRemove);
  });

  it('should return correct toast class for a given toast type', () => {
    TOAST_CLASSES_MAP.set(ToastType.SUCCESS, 'toast-success');
    const toast = mockToasts[0];
    expect(component.getToastClass(toast)).toBe('toast-success');
  });

  it('should return empty string if toast type has no class mapping', () => {
    const toastWithoutClass: Toast = {
      message: 'No class toast',
      type: 'invalid' as unknown as ToastType,
    };
    expect(component.getToastClass(toastWithoutClass)).toBe('');
  });

  it('should return correct toast informer class for a given toast type', () => {
    TOAST_INFORMER_CLASSES_MAP.set(ToastType.ERROR, 'toast-informer-error');
    const toast = mockToasts[1];
    expect(component.getToastInformerClass(toast)).toBe('toast-informer-error');
  });

  it('should return empty string if toast type has no informer class mapping', () => {
    const toastWithoutInformerClass: Toast = {
      message: 'No informer class',
      type: 'invalid' as unknown as ToastType,
    };
    expect(component.getToastInformerClass(toastWithoutInformerClass)).toBe('');
  });

  it('should return correct icon for a given toast type', () => {
    TOAST_ICON_MAP.set(ToastType.SUCCESS, 'icon-success');
    const toast = mockToasts[0];
    expect(component.getToastIcon(toast)).toBe('icon-success');
  });

  it('should return empty string if toast type has no icon mapping', () => {
    const toastWithoutIcon: Toast = {
      message: 'No icon toast',
      type: 'invalid' as unknown as ToastType,
    };
    expect(component.getToastIcon(toastWithoutIcon)).toBe('');
  });

  it('should handle undefined toast class mappings gracefully', () => {
    const toastWithoutMapping: Toast = {
      message: 'Test with no mapping',
      type: ToastType.WARNING,
    };
    TOAST_CLASSES_MAP.delete(ToastType.WARNING);
    expect(component.getToastClass(toastWithoutMapping)).toBe('');
  });

  it('should handle undefined toast informer class mappings gracefully', () => {
    const toastWithoutMapping: Toast = {
      message: 'Test with no mapping',
      type: ToastType.INFO,
    };
    TOAST_INFORMER_CLASSES_MAP.delete(ToastType.INFO);
    expect(component.getToastInformerClass(toastWithoutMapping)).toBe('');
  });
});
