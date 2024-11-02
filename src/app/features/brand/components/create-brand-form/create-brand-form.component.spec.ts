import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { CreateBrandFormComponent } from './create-brand-form.component';
import { BrandService } from '@/features/brand/services/brand.service';
import { ToastService } from '@/shared/services/ui/toast.service';
import {
  MIN_BRAND_NAME_LENGTH,
  MAX_BRAND_NAME_LENGTH,
  MIN_BRAND_DESCRIPTION_LENGTH,
  MAX_BRAND_DESCRIPTION_LENGTH,
  BRAND_CREATE_SUCCESS_MESSAGE,
} from '@/domain/utils/constants/Brand';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CreateBrandRequestDTO } from '@/domain/models/Brand';
import { of } from 'rxjs';
import { ToastType } from '@/domain/models/Toast';

describe('CreateBrandFormComponent', () => {
  let component: CreateBrandFormComponent;
  let fixture: ComponentFixture<CreateBrandFormComponent>;
  let brandServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    brandServiceMock = {
      createBrand: jest.fn(),
      notifyBrandCreated: jest.fn(),
    };

    toastServiceMock = {
      showToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateBrandFormComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    brandServiceMock = TestBed.inject(BrandService);
    toastServiceMock = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(CreateBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields correctly', () => {
    const nameField = component.fields.find((field) => field.name === 'name');
    const descriptionField = component.fields.find(
      (field) => field.name === 'description'
    );

    expect(nameField).toBeTruthy();
    expect(descriptionField).toBeTruthy();

    const nameValidators = nameField?.validators || [];
    const descriptionValidators = descriptionField?.validators || [];

    const hasRequiredNameValidator = nameValidators.some(
      (v) => v === Validators.required
    );
    const hasMinLengthNameValidator = nameValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.minLength(MIN_BRAND_NAME_LENGTH))
    );
    const hasMaxLengthNameValidator = nameValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.maxLength(MAX_BRAND_NAME_LENGTH))
    );

    expect(hasRequiredNameValidator).toBe(true);
    expect(hasMinLengthNameValidator).toBe(true);
    expect(hasMaxLengthNameValidator).toBe(true);

    const hasRequiredDescriptionValidator = descriptionValidators.some(
      (v) => v === Validators.required
    );
    const hasMinLengthDescriptionValidator = descriptionValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.minLength(MIN_BRAND_DESCRIPTION_LENGTH))
    );
    const hasMaxLengthDescriptionValidator = descriptionValidators.some(
      (v) =>
        JSON.stringify(v) ===
        JSON.stringify(Validators.maxLength(MAX_BRAND_DESCRIPTION_LENGTH))
    );

    expect(hasRequiredDescriptionValidator).toBe(true);
    expect(hasMinLengthDescriptionValidator).toBe(true);
    expect(hasMaxLengthDescriptionValidator).toBe(true);
  });
  it('should show success toast on successful form submission', () => {
    const brandToCreate: CreateBrandRequestDTO = {
      name: 'Test Brand',
      description: 'Test Description',
    };

    jest.spyOn(brandServiceMock, 'createBrand').mockReturnValue(of({}));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit(brandToCreate);

    expect(showToastSpy).toHaveBeenCalledWith({
      message: BRAND_CREATE_SUCCESS_MESSAGE,
      type: ToastType.SUCCESS,
    });
  });
});
