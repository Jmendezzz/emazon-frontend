import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryFormComponent } from './create-category-form.component';
import { CategoryService } from '@/features/category/services/category.service';
import { ToastService } from '@/shared/services/ui/toast.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MIN_CATEGORY_NAME_LENGTH,
  MAX_CATEGORY_NAME_LENGTH,
  CATEGORY_CREATE_SUCCESS_MESSAGE,
  CATEGORY_CREATE_ERROR_MESSAGE,
} from '@/domain/utils/constants/Category';
import { CreateCategoryRequestDTO } from '@/domain/models/Category';
import { of, throwError } from 'rxjs';
import { ToastType } from '@/domain/models/Toast';

describe('CreateCategoryFormComponent', () => {
  let component: CreateCategoryFormComponent;
  let fixture: ComponentFixture<CreateCategoryFormComponent>;
  let categoryServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      createCategory: jest.fn(),
      notifyCategoryCreated: jest.fn(),
    };

    toastServiceMock = {
      showToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    categoryServiceMock = TestBed.inject(CategoryService);
    toastServiceMock = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(CreateCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form fields with correct validators', () => {
    const nameField = component.fields.find((field) => field.name === 'name');
    const descriptionField = component.fields.find(
      (field) => field.name === 'description'
    );

    expect(nameField).toBeTruthy();
    expect(descriptionField).toBeTruthy();

    const nameValidators = nameField?.validators || [];
    const descriptionValidators = descriptionField?.validators || [];

    const hasRequiredValidator = nameValidators.some(
      (v) => v === Validators.required
    );
    const hasMinLengthValidator = nameValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.minLength(MIN_CATEGORY_NAME_LENGTH))
    );
    const hasMaxLengthValidator = nameValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.maxLength(MAX_CATEGORY_NAME_LENGTH))
    );

    expect(hasRequiredValidator).toBe(true);
    expect(hasMinLengthValidator).toBe(true);
    expect(hasMaxLengthValidator).toBe(true);

    const hasRequiredDescriptionValidator = descriptionValidators.some(
      (v) => v === Validators.required
    );
    const hasMinLengthDescriptionValidator = descriptionValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.minLength(MIN_CATEGORY_NAME_LENGTH))
    );
    const hasMaxLengthDescriptionValidator = descriptionValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.maxLength(MAX_CATEGORY_NAME_LENGTH))
    );

    expect(hasRequiredDescriptionValidator).toBe(true);
    expect(hasMinLengthDescriptionValidator).toBe(true);
    expect(hasMaxLengthDescriptionValidator).toBe(true);
  });
  it('should show success toast on successful form submission', () => {
    const categoryToCreate: CreateCategoryRequestDTO = {
      name: 'Test Category',
      description: 'Test Description',
    };

    jest.spyOn(categoryServiceMock, 'createCategory').mockReturnValue(of({}));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit(categoryToCreate);

    expect(showToastSpy).toHaveBeenCalledWith({
      message: CATEGORY_CREATE_SUCCESS_MESSAGE,
      type: 'success',
    });
  });

});
