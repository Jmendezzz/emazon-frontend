import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateArticleFormComponent } from './create-article-form.component';
import { ArticleService } from '../../services/article.service';
import { BrandService } from '@/features/brand/services/brand.service';
import { CategoryService } from '@/features/category/services/category.service';
import { ToastService } from '@/shared/services/ui/toast.service';
import {
  ARTICLE_CREATE_ERROR_MESSAGE,
  ARTICLE_CREATE_SUCCESS_MESSAGE,
  MAX_CATEGORIES_ARTICLE,
  MIN_CATEGORIES_ARTICLE,
} from '@/domain/utils/constants/Article';
import { DropdownOption } from '@/components/molecules/dropdown/dropdown-types';
import { CreateArticleRequestDTO } from '@/domain/models/Article';
import { ToastType } from '@/domain/models/Toast';

describe('CreateArticleFormComponent', () => {
  let component: CreateArticleFormComponent;
  let fixture: ComponentFixture<CreateArticleFormComponent>;
  let articleServiceMock: any;
  let categoryServiceMock: any;
  let brandServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    articleServiceMock = {
      createArticle: jest.fn(),
      notifyArticleCreated: jest.fn(),
    };
    categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of([{ id: 1, name: 'Category1' }])),
    };
    brandServiceMock = {
      getAllBrands: jest.fn().mockReturnValue(of([{ id: 1, name: 'Brand1' }])),
    };
    toastServiceMock = {
      showToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateArticleFormComponent],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields correctly', () => {
    const nameField = component.fields.find((field) => field.name === 'name');
    const categoriesField = component.fields.find((field) => field.name === 'categoriesIds');

    expect(nameField).toBeTruthy();
    expect(categoriesField).toBeTruthy();

    expect(nameField?.validators).toContain(Validators.required);
    expect(categoriesField?.validators).toContain(Validators.required);

    const minCategoriesValidator = categoriesField?.validators?.some(
      (v) => JSON.stringify(v) === JSON.stringify(Validators.minLength(MIN_CATEGORIES_ARTICLE))
    );
    const maxCategoriesValidator = categoriesField?.validators?.some(
      (v) => JSON.stringify(v) === JSON.stringify(Validators.maxLength(MAX_CATEGORIES_ARTICLE))
    );

    expect(minCategoriesValidator).toBe(true);
    expect(maxCategoriesValidator).toBe(true);
  });

  it('should load category dropdown options on init', () => {
    component.ngOnInit();
    expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();

    categoryServiceMock.getAllCategories().subscribe(() => {
      expect(component.categorieDropdownOptions).toEqual([
        { label: 'Category1', value: 1 } as DropdownOption,
      ]);
    });
  });

  it('should load brand dropdown options on init', () => {
    component.ngOnInit();
    expect(brandServiceMock.getAllBrands).toHaveBeenCalled();

    brandServiceMock.getAllBrands().subscribe(() => {
      expect(component.brandDropdownOptions).toEqual([
        { label: 'Brand1', value: 1 } as DropdownOption,
      ]);
    });
  });

  it('should update fields with loaded dropdown options', () => {
    component.loadCategoryDropdownOptions();
    component.loadBrandDropdownOptions();

    categoryServiceMock.getAllCategories().subscribe(() => {
      brandServiceMock.getAllBrands().subscribe(() => {
        const categoriesField = component.fields.find((field) => field.name === 'categoriesIds');
        const brandField = component.fields.find((field) => field.name === 'brandId');

        expect(categoriesField?.dropdownOptions).toEqual([
          { label: 'Category1', value: 1 } as DropdownOption,
        ]);
        expect(brandField?.dropdownOptions).toEqual([
          { label: 'Brand1', value: 1 } as DropdownOption,
        ]);
      });
    });
  });

  it('should submit the form successfully and show success toast', () => {
    const articleToCreate: CreateArticleRequestDTO = {
      name: 'Test Article',
      description: 'Test Description',
      price: 100,
      stock: 10,
      brandId: 1,
      categoriesIds: [1],
    };

    jest.spyOn(articleServiceMock, 'createArticle').mockReturnValue(of({}));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit(articleToCreate);

    expect(showToastSpy).toHaveBeenCalledWith({
      message: ARTICLE_CREATE_SUCCESS_MESSAGE,
      type: ToastType.SUCCESS,
    });
    expect(articleServiceMock.notifyArticleCreated).toHaveBeenCalled();
  });

});
