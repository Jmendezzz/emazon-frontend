import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateCategoryFormComponent } from './create-category-form.component';
import { CategoryService } from 'src/app/shared/services/api/category.service';
import { Category } from 'src/app/domain/models/Category';

describe('CreateCategoryFormComponent', () => {
  let component: CreateCategoryFormComponent;
  let fixture: ComponentFixture<CreateCategoryFormComponent>;
  let mockCategoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    mockCategoryService = {
      createCategory: jest.fn(),
      notifyCategoryCreated: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateCategoryFormComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
      ],
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
    expect(component.getErrorMessage('description')).toBe('This field is required');
  });

  it('should create a category when the form is valid', () => {
    const mockCategory: Category = { id: 1, name: 'New Category', description: 'Description' };
    mockCategoryService.createCategory.mockReturnValue(of(mockCategory));
    jest.spyOn(component.onCategoryCreated, 'emit');

    component.form.setValue({ name: 'New Category', description: 'Description' });
    component.onCreate();

    expect(mockCategoryService.createCategory).toHaveBeenCalledWith({ name: 'New Category', description: 'Description' });
    expect(component.onCategoryCreated.emit).toHaveBeenCalledWith(mockCategory);
    expect(mockCategoryService.notifyCategoryCreated).toHaveBeenCalled();
    expect(component.form.value).toEqual({ name: '', description: '' });
  });

  it('should not create a category when the form is invalid', () => {
    component.form.setValue({ name: '', description: '' });
    component.onCreate();

    expect(mockCategoryService.createCategory).not.toHaveBeenCalled();
  });

  it('should handle error when creating a category fails', () => {
    const errorResponse = { status: 400, message: 'Bad Request' };
    mockCategoryService.createCategory.mockReturnValue(throwError(() => errorResponse));

    console.error = jest.fn();

    component.form.setValue({ name: 'New Category', description: 'Description' });
    component.onCreate();

    expect(mockCategoryService.createCategory).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });
});
