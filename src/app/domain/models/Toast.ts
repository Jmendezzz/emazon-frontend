export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}
export interface Toast {
    message: string;
    type: ToastType;
}