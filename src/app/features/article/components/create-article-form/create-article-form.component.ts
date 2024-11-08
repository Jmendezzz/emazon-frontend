import { Article, CreateArticleRequestDTO } from '@/domain/models/Article';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component, OnInit} from '@angular/core';
import { FormField } from '@/domain/models/Form';
import { Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { BrandService } from '@/features/brand/services/brand.service';
import { CategoryService } from '@/features/category/services/category.service';
import { DropdownOption } from '@/components/molecules/dropdown/dropdown-types';
import { ARTICLE_CREATE_ERROR_MESSAGE, ARTICLE_CREATE_SUCCESS_MESSAGE, MAX_BRAND_ARTICLE, MAX_CATEGORIES_ARTICLE, MAX_LENGTH_ARTICLE_DESCRIPTION, MAX_LENGTH_ARTICLE_NAME, MIN_CATEGORIES_ARTICLE, MIN_LENGTH_ARTICLE_DESCRIPTION, MIN_LENGTH_ARTICLE_NAME, MIN_PRICE_ARTICLE, MIN_STOCK_ARTICLE} from '@/domain/utils/constants/Article';

@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss']
})
export class CreateArticleFormComponent extends AbstractFormHandler<Article> implements OnInit {
  categorieDropdownOptions: DropdownOption[] = [];
  brandDropdownOptions: DropdownOption[] = [];

  fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [Validators.required, Validators.minLength(MIN_LENGTH_ARTICLE_NAME), Validators.maxLength(MAX_LENGTH_ARTICLE_NAME)],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [Validators.required, Validators.minLength(MIN_LENGTH_ARTICLE_DESCRIPTION), Validators.maxLength(MAX_LENGTH_ARTICLE_DESCRIPTION)],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      validators: [Validators.required, Validators.min(MIN_PRICE_ARTICLE)], 
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      validators: [Validators.required, Validators.min(MIN_STOCK_ARTICLE)],
    },
    {
      name: 'brandId',
      label: 'Brand',
      type: 'dropdown',
      validators: [Validators.required],
      maxDropdownSelections: MAX_BRAND_ARTICLE,
      dropdownOptions: this.brandDropdownOptions
    },
    {
      name: 'categoriesIds',
      label: 'Categories',
      type: 'dropdown',
      validators: [Validators.required, Validators.minLength(MIN_CATEGORIES_ARTICLE), Validators.maxLength(MAX_CATEGORIES_ARTICLE)],
      maxDropdownSelections: MAX_CATEGORIES_ARTICLE,
      dropdownOptions: this.categorieDropdownOptions
    }
  ]

  constructor(
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    toastService: ToastService
  ) {
    super(toastService);
  }



  ngOnInit(): void {
    this.loadCategoryDropdownOptions();
    this.loadBrandDropdownOptions();
  }
  
  loadCategoryDropdownOptions() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categorieDropdownOptions = categories.map((category) => ({
        label: category.name,
        value: category.id
      }));
      this.updateFieldsWithOptions();
    });
  }
  
  loadBrandDropdownOptions() {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.brandDropdownOptions = brands.map((brand) => ({
        label: brand.name,
        value: brand.id
      }));
      this.updateFieldsWithOptions();
    });
  }
  
  updateFieldsWithOptions() {
    this.fields = this.fields.map((field) => {
      if (field.name === 'brandId') {
        return {
          ...field,
          dropdownOptions: this.brandDropdownOptions
        };
      }
      if (field.name === 'categoriesIds') {
        return {
          ...field,
          dropdownOptions: this.categorieDropdownOptions
        };
      }
      return field;
    });
  }
  

  
  onSubmit(articleToCreate: CreateArticleRequestDTO) {
    this.handleFormSubmit(
      () => this.articleService.createArticle(articleToCreate),
      ARTICLE_CREATE_SUCCESS_MESSAGE,
      ARTICLE_CREATE_ERROR_MESSAGE,
      () => this.articleService.notifyArticleCreated()
    );
  }


}
