import { CreateCategoryRequestDTO } from '@/domain/models/Category';
import { FormField } from '@/domain/models/Form';
import {
  CATEGORY_CREATE_ERROR_MESSAGE,
  CATEGORY_CREATE_SUCCESS_MESSAGE,
  MAX_CATEGORY_NAME_LENGTH,
  MIN_CATEGORY_NAME_LENGTH,
} from '@/domain/utils/constants/Category';
import { CategoryService } from '@/features/category/services/category.service';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss'],
})
export class CreateCategoryFormComponent extends AbstractFormHandler<CreateCategoryRequestDTO> {
  fields: FormField[] = [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text',
      validators: [
        Validators.required,
        Validators.minLength(MIN_CATEGORY_NAME_LENGTH),
        Validators.maxLength(MAX_CATEGORY_NAME_LENGTH),
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [
        Validators.required,
        Validators.minLength(MIN_CATEGORY_NAME_LENGTH),
        Validators.maxLength(MAX_CATEGORY_NAME_LENGTH),
      ],
    },
  ];

  constructor(
    private readonly categoryService: CategoryService,
    toastService: ToastService
  ) {
    super(toastService);
  }

  onSubmit(categoryToCreate: CreateCategoryRequestDTO) {
    this.handleFormSubmit(
      () => this.categoryService.createCategory(categoryToCreate),
      CATEGORY_CREATE_SUCCESS_MESSAGE,
      CATEGORY_CREATE_ERROR_MESSAGE,
      () => this.categoryService.notifyCategoryCreated()
    );
  }
}
