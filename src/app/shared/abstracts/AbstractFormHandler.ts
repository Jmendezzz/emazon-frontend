import { Observable } from "rxjs";
import { ToastService } from "../services/ui/toast.service";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { ToastType } from "@/domain/models/Toast";

export abstract class AbstractFormHandler<T> {
    isLoading = false;
    constructor(private readonly toastService: ToastService) {}

    handleFormSubmit(submitFunction: () => Observable<T>, successMessage: string, errorMessage?: string, onSuccess?: () => void) {
        this.isLoading = true;
        submitFunction().subscribe({
            next: (response: T) => {
                this.handleSuccess(successMessage, onSuccess);
            },
            error: (error) => {
                this.handleError(error, errorMessage);
            }
        })
    }

    protected handleSuccess(message: string, onSuccess?: () => void) {
        this.toastService.showToast({
            message: message,
            type: ToastType.SUCCESS
        });
        if (onSuccess) {
            onSuccess();
        }
        this.isLoading = false;
    }

    private handleError(error: HttpErrorResponse, errorMessage?: string) {
        this.isLoading = false;
        if (
          error.status === HttpStatusCode.InternalServerError ||
          error.status === 0
        ) {
          this.toastService.showToast({
            message: errorMessage ?? 'An error occurred',
            type: ToastType.ERROR,
          });
        }
    
        if (error.status === HttpStatusCode.BadRequest) {
          const businessError = error.error as unknown as Error;
          this.toastService.showToast({
            message: businessError.message,
            type: ToastType.ERROR,
          });
        }
      }
}

