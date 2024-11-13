import { AuthReponseDTO, SignupRequestDTO } from '@/domain/models/Auth';
import { FormField } from '@/domain/models/Form';
import { MAX_PHONE_NUMBER_LENGTH, MIN_AGE } from '@/domain/utils/constants/User';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { minAgeValidator } from '@/shared/validators/min-age-validator';
import { passwordValidator } from '@/shared/validators/password-validator';
import { Component} from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FAILED_SIGNUP_MESSAGE, SUCCESSFUL_SIGNUP_MESSAGE } from '@/domain/utils/constants/Auth';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent extends AbstractFormHandler<AuthReponseDTO> {
  fields: FormField[] = [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstName',
      validators: [Validators.required],
    },
    {
      label: 'Last Name',
      type: 'text',
      name: 'lastName',
      validators: [Validators.required],
    },
    {
      label: 'Identity Number',
      type: 'number',
      name: 'identityNumber',
      validators: [Validators.required],
    },
    {
      label: 'Phone Number',
      type: 'text',
      name: 'phoneNumber',
      prefix: '+57',
      validators: [
        Validators.required,
        Validators.maxLength(MAX_PHONE_NUMBER_LENGTH),
      ],
    },
    {
      label: 'Birth Date',
      type: 'date',
      name: 'birthDate',
      validators: [Validators.required, minAgeValidator(MIN_AGE)],
    },
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
      validators: [Validators.required, passwordValidator()],
    },
  ];
  constructor(toastService: ToastService, private readonly authService: AuthService, private readonly router: Router) {
    super(toastService);
  }

  
  onSubmit(signUpRequest: SignupRequestDTO) {
    this.handleFormSubmit(
      () => this.authService.signup(signUpRequest),
      SUCCESSFUL_SIGNUP_MESSAGE,
      FAILED_SIGNUP_MESSAGE,
      ()=> this.redirectToWarehouseList() 
    );
  }

  redirectToWarehouseList(): void {
    this.router.navigate(['/']); 
  }

}
