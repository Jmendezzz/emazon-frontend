import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Router } from '@angular/router';
import {
  FAILED_LOGIN_MESSAGE,
  SUCCESSFUL_LOGIN_MESSAGE,
} from '@/domain/utils/constants/Auth';
import { AuthReponseDTO, LoginRequestDTO, Role } from '@/domain/models/Auth';
import { ToastType } from '@/domain/models/Toast';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceMock: any;
  let toastServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    };
    toastServiceMock = {
      showToast: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields correctly', () => {
    const emailField = component.fields.find((field) => field.name === 'email');
    const passwordField = component.fields.find((field) => field.name === 'password');

    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();

    expect(emailField?.validators).toContain(Validators.required);
    expect(emailField?.validators).toContain(Validators.email);
    expect(passwordField?.validators).toContain(Validators.required);
  });

  it('should submit the form successfully and show success toast', () => {
    const loginRequest: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: Role.USER,
    };

    jest.spyOn(authServiceMock, 'login').mockReturnValue(of(authResponse));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');
    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.onSubmit(loginRequest);

    expect(showToastSpy).toHaveBeenCalledWith({
      message: SUCCESSFUL_LOGIN_MESSAGE,
      type: ToastType.SUCCESS,
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle login failure and show error toast', () => {
    const loginRequest: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    jest.spyOn(authServiceMock, 'login').mockReturnValue(throwError(() => new Error('Login failed')));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit(loginRequest);

    expect(showToastSpy).toHaveBeenCalledWith({
      message: FAILED_LOGIN_MESSAGE,
      type: ToastType.ERROR,
    });
  });

  it('should redirect to admin categories for admin role', () => {
    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: Role.ADMIN,
    };

    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.onSuccesfulSubmit(authResponse);

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/categories']);
  });

  it('should redirect to home for user role', () => {
    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: Role.USER,
    };

    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.onSuccesfulSubmit(authResponse);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to admin categories for warehouse assistant role', () => {
    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: Role.WAREHOUSE_ASSISTANT,
    };

    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.onSuccesfulSubmit(authResponse);

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/categories']);
  });

  it('should redirect to home for unknown role', () => {
    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: 'UNKNOWN_ROLE' as Role,
    };

    const navigateSpy = jest.spyOn(routerMock, 'navigate');

    component.onSuccesfulSubmit(authResponse);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});