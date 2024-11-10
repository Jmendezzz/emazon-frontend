import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormField } from '@/domain/models/Form';
import { Validators } from '@angular/forms';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { AuthReponseDTO, LoginRequestDTO, Role } from '@/domain/models/Auth';
import { Router } from '@angular/router';
import {
  FAILED_LOGIN_MESSAGE,
  SUCCESSFUL_LOGIN_MESSAGE,
} from '@/domain/utils/constants/Auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends AbstractFormHandler<AuthReponseDTO> {
  fields: FormField[] = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      validators: [Validators.required],
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router,
    toastService: ToastService
  ) {
    super(toastService);
  }

  onSubmit(loginRequest: LoginRequestDTO) {
    this.handleFormSubmit(
      () => this.authService.login(loginRequest),
      SUCCESSFUL_LOGIN_MESSAGE,
      FAILED_LOGIN_MESSAGE,
      (auhtResponse: AuthReponseDTO) => {
        this.onSuccesfulSubmit(auhtResponse);
      }
    );
  }

  onSuccesfulSubmit(auhtResponse: AuthReponseDTO) {
    switch (auhtResponse.role) {
      case Role.ADMIN:
        this.route.navigate(['/admin/categories']);
        break;
      case Role.USER:
        this.route.navigate(['/']);
        break;
      case Role.WAREHOUSE_ASSISTANT:
        this.route.navigate(['/admin/categories']);
        break;
      default:
        this.route.navigate(['/']);
        break;
    }
  }
}
