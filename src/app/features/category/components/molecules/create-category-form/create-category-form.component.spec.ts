import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateCategoryFormComponent } from './create-category-form.component';
import { CategoryService } from '@/features/category/services/category.service';
import { InputFormRowComponent } from '@/components/molecules';
import {
  ButtonComponent,
  InputComponent,
  TextAreaComponent,
} from '@/components/atoms';
import { Category } from '@/domain/models/Category';

describe('CreateCategoryFormComponent', () => {
  let component: CreateCategoryFormComponent;
  let fixture: ComponentFixture<CreateCategoryFormComponent>;
  let mockCategoryService: jest.Mocked<CategoryService>;

  const mockCategory: Category = {
    id: 1,
    name: 'New Category',
    description: 'Description',
  };
  beforeEach(async () => {
    mockCategoryService = {
      createCategory: jest.fn(),
      notifyCategoryCreated: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        CreateCategoryFormComponent,
        InputFormRowComponent,
        ButtonComponent,
        InputComponent,
        TextAreaComponent,
      ],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with two controls', () => {
    expect(component.form.contains('name')).toBe(true);
    expect(component.form.contains('description')).toBe(true);
  });

  it('should mark controls as invalid when empty', () => {
    const nameControl = component.getControl('name');
    const descriptionControl = component.getControl('description');

    nameControl.setValue('');
    descriptionControl.setValue('');
    nameControl.markAsTouched();
    descriptionControl.markAsTouched();

    expect(component.form.valid).toBe(false);
    expect(component.getErrorMessage('name')).toBe('This field is required');
    expect(component.getErrorMessage('description')).toBe(
      'This field is required'
    );
  });

  it('should create a category when the form is valid', () => {
    mockCategoryService.createCategory.mockReturnValue(of(mockCategory));
    jest.spyOn(component.onCategoryCreated, 'emit');

    component.form.setValue({
      name: 'New Category',
      description: 'Description',
    });

    component.onCreate();

    expect(mockCategoryService.createCategory).toHaveBeenCalledWith({
      name: 'New Category',
      description: 'Description',
    });

    expect(component.onCategoryCreated.emit).toHaveBeenCalledWith(mockCategory);
    
    expect(mockCategoryService.notifyCategoryCreated).toHaveBeenCalled();

    expect(component.form.value).toEqual({
      name: null,
      description: null,
    });
  });

  it('should handle error when creating a category fails', () => {
    const errorResponse = { status: 400, message: 'Bad Request' };
    mockCategoryService.createCategory.mockReturnValue(
      throwError(() => errorResponse)
    );

    console.error = jest.fn();

    const handleErrorSpy = jest.spyOn(component, 'handleError');

    component.form.setValue({
      name: 'New Category',
      description: 'Description',
    });
    component.onCreate();

    expect(mockCategoryService.createCategory).toHaveBeenCalled();

    expect(handleErrorSpy).toHaveBeenCalledWith(errorResponse);
  });
});
