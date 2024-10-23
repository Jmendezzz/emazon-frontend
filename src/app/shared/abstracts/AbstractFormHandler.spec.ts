import { of, throwError } from 'rxjs';
import { ToastService } from '../services/ui/toast.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastType } from '@/domain/models/Toast';
import { AbstractFormHandler } from './AbstractFormHandler';

class TestFormHandler extends AbstractFormHandler<any> {
  constructor(toastService: ToastService) {
    super(toastService);
  }
}

describe('AbstractFormHandler', () => {
  let testFormHandler: TestFormHandler;
  let toastService: ToastService;

  beforeEach(() => {
    toastService = {
      showToast: jest.fn(),
    } as unknown as ToastService;

    testFormHandler = new TestFormHandler(toastService);
  });

  it('should call handleSuccess on successful form submission', () => {
    const submitFunction = jest.fn().mockReturnValue(of({}));
    const successMessage = 'Success!';
    const onSuccess = jest.fn();

    testFormHandler.handleFormSubmit(submitFunction, successMessage, undefined, onSuccess);

    expect(toastService.showToast).toHaveBeenCalledWith({
      message: successMessage,
      type: ToastType.SUCCESS,
    });
    expect(onSuccess).toHaveBeenCalled();
    expect(testFormHandler.isLoading).toBe(false);
  });

  it('should call handleError on form submission error', () => {
    const submitFunction = jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: HttpStatusCode.InternalServerError })));
    const errorMessage = 'Error!';

    testFormHandler.handleFormSubmit(submitFunction, 'Success!', errorMessage);

    expect(toastService.showToast).toHaveBeenCalledWith({
      message: errorMessage,
      type: ToastType.ERROR,
    });
    expect(testFormHandler.isLoading).toBe(false);
  });

  it('should call handleError with default message on form submission error without errorMessage', () => {
    const submitFunction = jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: HttpStatusCode.InternalServerError })));

    testFormHandler.handleFormSubmit(submitFunction, 'Success!');

    expect(toastService.showToast).toHaveBeenCalledWith({
      message: 'An error occurred',
      type: ToastType.ERROR,
    });
    expect(testFormHandler.isLoading).toBe(false);
  });

  it('should handle business error on form submission error with status 400', () => {
    const businessError = new Error('Business error');
    const submitFunction = jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: HttpStatusCode.BadRequest, error: businessError })));

    testFormHandler.handleFormSubmit(submitFunction, 'Success!');

    expect(toastService.showToast).toHaveBeenCalledWith({
      message: businessError.message,
      type: ToastType.ERROR,
    });
    expect(testFormHandler.isLoading).toBe(false);
  });
});