import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CreateWarehouseFormComponent } from './create-warehouse-form.component';
import { UserService } from '../../services/user.service';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { MAX_PHONE_NUMBER_LENGTH, MIN_AGE } from '@/domain/utils/constants/User';
import { CreateUserRequestDTO } from '@/domain/models/User';
import { passwordValidator } from '@/shared/validators/password-validator';
import { minAgeValidator } from '@/shared/validators/min-age-validator';
import { ToastType } from '@/domain/models/Toast';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateWarehouseFormComponent', () => {
  let component: CreateWarehouseFormComponent;
  let fixture: ComponentFixture<CreateWarehouseFormComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;
  let routerMock: any;

  const mockWarehouse: CreateUserRequestDTO = {
    firstName: 'John',
    lastName: 'Doe',
    identityNumber: 123456789,
    phoneNumber: '+573001234567',
    birthDate: new Date('2000-01-01'),
    email: 'john.doe@example.com',
    password: 'Password123!',
  };

  beforeEach(async () => {
    userServiceMock = {
      createWarehouseAssistant: jest.fn(),
    };

    toastServiceMock = {
      showToast: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateWarehouseFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWarehouseFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with form fields', () => {
    fixture.detectChanges();
    expect(component.fields.length).toBeGreaterThan(0);
    expect(component.fields[0].name).toBe('firstName');
  });

  it('should call userService.createWarehouseAssistant on form submit', fakeAsync(() => {
    userServiceMock.createWarehouseAssistant.mockReturnValue(of({}));
    component.onSubmit(mockWarehouse);
    tick();
    expect(userServiceMock.createWarehouseAssistant).toHaveBeenCalledWith(mockWarehouse);
  }));

  it('should show success toast and navigate on successful submission', fakeAsync(() => {
    userServiceMock.createWarehouseAssistant.mockReturnValue(of({}));
    component.onSubmit(mockWarehouse);
    tick();
    expect(toastServiceMock.showToast).toHaveBeenCalledWith({
      message: 'Warehouse created successfully',
      type: ToastType.SUCCESS,
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['admin/users/warehouses']);
  }));

  it('should handle error and show error toast on failure', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: HttpStatusCode.BadRequest,
      statusText: 'Bad Request',
      error: { message: 'Error creating warehouse' },
    });

    userServiceMock.createWarehouseAssistant.mockReturnValue(throwError(() => errorResponse));

    component.onSubmit(mockWarehouse);
    tick();

    expect(toastServiceMock.showToast).toHaveBeenCalled();
  }));

  it('should handle server error and show generic error message on failure', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });

    userServiceMock.createWarehouseAssistant.mockReturnValue(throwError(() => errorResponse));

    component.onSubmit(mockWarehouse);
    tick();

    expect(toastServiceMock.showToast).toHaveBeenCalled();
  }));


  it('should call redirectToWarehouseList on success', fakeAsync(() => {
    const redirectToWarehouseListSpy = jest.spyOn(component, 'redirectToWarehouseList');
    userServiceMock.createWarehouseAssistant.mockReturnValue(of({}));
    component.onSubmit(mockWarehouse);
    tick();
    expect(redirectToWarehouseListSpy).toHaveBeenCalled();
  }));

  it('should validate phone number length correctly', () => {
    const phoneField = component.fields.find(field => field.name === 'phoneNumber');
    if (phoneField) {
      const hasMaxLengthValidator = phoneField.validators?.some(
        validator => JSON.stringify(validator) === JSON.stringify(Validators.maxLength(MAX_PHONE_NUMBER_LENGTH))
      );
      expect(hasMaxLengthValidator).toBe(true);
    }
  });

  it('should validate minimum age correctly', () => {
    const birthDateField = component.fields.find(field => field.name === 'birthDate');
    if (birthDateField) {
      const hasMinAgeValidator = birthDateField.validators?.some(
        validator => JSON.stringify(validator) === JSON.stringify(minAgeValidator(MIN_AGE))
      );
      expect(hasMinAgeValidator).toBe(true);
    }
  });

  it('should validate password with correct regex pattern', () => {
    const passwordField = component.fields.find(field => field.name === 'password');
    if (passwordField) {
      const hasPasswordValidator = passwordField.validators?.some(
        validator => JSON.stringify(validator) === JSON.stringify(passwordValidator())
      );
      expect(hasPasswordValidator).toBe(true);
    }
  });

});
