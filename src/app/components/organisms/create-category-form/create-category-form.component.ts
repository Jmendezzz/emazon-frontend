import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Category,
  CreateCategoryRequestDTO,
} from 'src/app/domain/models/Category';
import { ToastType } from 'src/app/domain/models/Toast';
import { CategoryService } from 'src/app/shared/services/api/category.service';
import { ToastService } from 'src/app/shared/services/ui/toast.service';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss'],
})
export class CreateCategoryFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  @Output() onCategoryCreated = new EventEmitter<Category>();

  constructor(private readonly categoryService: CategoryService, private readonly toastService: ToastService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getErrorMessage(name: string): string {
    const control = this.getControl(name);
    if (control.hasError('required') && control.touched) {
      return 'This field is required';
    }
    return '';
  }

  onCreate() {
    if (this.form.valid) {
      this.isLoading = true;

      const categoryToCreate: CreateCategoryRequestDTO = this.form.value;
      this.categoryService.createCategory(categoryToCreate).subscribe({
        next: (category: Category) => {
          this.handleSuccess(category);
        },
        error: (error) => {
          this.handleError(error);
      }});
    }
  }
  private handleSuccess(category: Category) {
    this.onCategoryCreated.emit(category);
    this.categoryService.notifyCategoryCreated();
    this.form.reset();
    this.isLoading = false;
  }

  private handleError(error: any) {
    this.toastService.showToast({
      message: 'An error occurred while creating the category',
      type: ToastType.ERROR,
    });
    this.isLoading = false
  }
}
