import { FormField } from '@/domain/models/Form';
import { CreateUserRequestDTO, User } from '@/domain/models/User';
import {
  MAX_PHONE_NUMBER_LENGTH,
  MIN_AGE,
} from '@/domain/utils/constants/User';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { minAgeValidator } from '@/shared/validators/min-age-validator';
import { passwordValidator } from '@/shared/validators/password-validator';
import { Component} from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-warehouse-form',
  templateUrl: './create-warehouse-form.component.html',
  styleUrls: ['./create-warehouse-form.component.scss'],
})
export class CreateWarehouseFormComponent extends AbstractFormHandler<User> {
  fields: FormField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'identityNumber',
      label: 'Identity Number',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      prefix: '+57',
      validators: [
        Validators.required,
        Validators.maxLength(MAX_PHONE_NUMBER_LENGTH),
      ],
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      validators: [Validators.required, minAgeValidator(MIN_AGE)],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validators: [Validators.required, passwordValidator()],
    },
  ];

  constructor(
    private readonly userService: UserService,
    toastService: ToastService,
    private readonly router: Router
  ) {
    super(toastService);
  }

  ngOnInit(): void {}

  onSubmit(warehouse: CreateUserRequestDTO) {
    this.handleFormSubmit(
      () => this.userService.createWarehouseAssistant(warehouse),
      'Warehouse created successfully',
      'Error creating warehouse',
      ()=> this.redirectToWarehouseList() 
    );
  }

  redirectToWarehouseList(): void {
    this.router.navigate(['admin/users/warehouses']); 
  }
}
