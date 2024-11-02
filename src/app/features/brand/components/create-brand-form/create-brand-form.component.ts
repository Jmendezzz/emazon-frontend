import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastService } from '@/shared/services/ui/toast.service';
import { FormField } from '@/domain/models/Form';
import { CreateBrandRequestDTO } from '@/domain/models/Brand';
import {
  BRAND_CREATE_ERROR_MESSAGE,
  BRAND_CREATE_SUCCESS_MESSAGE,
  MAX_BRAND_DESCRIPTION_LENGTH,
  MAX_BRAND_NAME_LENGTH,
  MIN_BRAND_DESCRIPTION_LENGTH,
  MIN_BRAND_NAME_LENGTH,
} from '@/domain/utils/constants/Brand';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { BrandService } from '@/features/brand/services/brand.service';

@Component({
  selector: 'app-create-brand-form',
  templateUrl: './create-brand-form.component.html',
  styleUrls: ['./create-brand-form.component.scss'],
})
export class CreateBrandFormComponent extends AbstractFormHandler<CreateBrandRequestDTO> {
  fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [
        Validators.required,
        Validators.minLength(MIN_BRAND_NAME_LENGTH),
        Validators.maxLength(MAX_BRAND_NAME_LENGTH),
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [
        Validators.required,
        Validators.minLength(MIN_BRAND_DESCRIPTION_LENGTH),
        Validators.maxLength(MAX_BRAND_DESCRIPTION_LENGTH),
      ],
    }
  ];

  constructor(
    private readonly brandService: BrandService,
    toastService: ToastService
  ) {
    super(toastService);
  }

  onSubmit(brandToCreate: CreateBrandRequestDTO) {
    this.handleFormSubmit(
      () => this.brandService.createBrand(brandToCreate),
      BRAND_CREATE_SUCCESS_MESSAGE,
      BRAND_CREATE_ERROR_MESSAGE,
      () => this.brandService.notifyBrandCreated()
    );
  }
}
