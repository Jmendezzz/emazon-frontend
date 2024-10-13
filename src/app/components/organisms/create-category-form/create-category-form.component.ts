import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Category,
  CreateCategoryRequestDTO,
} from 'src/app/domain/models/Category';
import { CategoryService } from 'src/app/shared/services/api/category.service';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss'],
})
export class CreateCategoryFormComponent implements OnInit {
  form: FormGroup;
  @Output() onCategoryCreated = new EventEmitter<Category>();

  constructor(private readonly categoryService: CategoryService) {
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
      const categoryToCreate: CreateCategoryRequestDTO = this.form.value;
      this.categoryService.createCategory(categoryToCreate).subscribe({
        next: (category: Category) => {
          this.onCategoryCreated.emit(category);
          this.categoryService.notifyCategoryCreated();
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
