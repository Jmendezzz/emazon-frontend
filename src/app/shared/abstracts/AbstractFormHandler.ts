import { ToastType } from "@/domain/models/Toast";
import { Observable } from "rxjs";
import { ToastService } from "../services/ui/toast.service";
import { HttpErrorResponse } from "@angular/common/http";

export abstract class AbstractFormHandler<T> {
    isLoading = false;
    constructor(private readonly toastService: ToastService) {}

    handleFormSubmit(submitFunction: () => Observable<T>, successMessage: string, errorMessage?: string, onSuccess?: (response: T) => void) {
        this.isLoading = true;
        submitFunction().subscribe({
            next: (response: T) => {
                this.handleSuccess(successMessage, response, onSuccess);
            },
            error: (error) => {
                this.handleError(error, errorMessage);
            }
        });
    }

    protected handleSuccess(message: string, response: T, onSuccess?: (response: T) => void) {
        this.toastService.showToast({
            message: message,
            type: ToastType.SUCCESS,
        });
        this.isLoading = false;
        if (onSuccess) {
            onSuccess(response);
        }
    }

    protected handleError(error: HttpErrorResponse, errorMessage?: string) {
        const message = errorMessage || 'An error occurred. Please try again.';
        this.toastService.showToast({
            message: message,
            type: ToastType.ERROR,
        });
        this.isLoading = false;
    }
}