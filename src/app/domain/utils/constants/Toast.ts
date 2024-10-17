import { ToastType } from '../../models/Toast';

export const TOAST_DURATION = 2000; //In ms

export const TOAST_CLASSES_MAP: Map<ToastType, string> = new Map([
  [ToastType.ERROR, 'toast__item--error'],
  [ToastType.INFO, 'toast__item--info'],
  [ToastType.SUCCESS, 'toast__item--success'],
  [ToastType.WARNING, 'toast__item--warning'],
]);

export const TOAST_INFORMER_CLASSES_MAP: Map<ToastType, string> = new Map([
  [ToastType.ERROR, 'toast__informer--error'],
  [ToastType.INFO, 'toast__informer--info'],
  [ToastType.SUCCESS, 'toast__informer--success'],
  [ToastType.WARNING, 'toast__informer--warning'],
]);

export const TOAST_ICON_MAP: Map<ToastType, string> = new Map([
    [ToastType.ERROR, 'assets/ui/error.svg'],
    [ToastType.INFO, 'assets/ui/info.svg'],
    [ToastType.SUCCESS, 'assets/ui/success.svg'],
    [ToastType.WARNING, 'assets/ui/warning.svg'],
])