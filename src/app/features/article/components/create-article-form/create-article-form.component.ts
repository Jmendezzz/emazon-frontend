import { Article, CreateArticleRequestDTO } from '@/domain/models/Article';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component} from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FormField } from '@/domain/models/Form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss']
})
export class CreateArticleFormComponent extends AbstractFormHandler<Article> {
  fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [Validators.required],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'brandId',
      label: 'Brand',
      type: 'dropdown',
      validators: [Validators.required],
      maxDropdownSelections: 1,
      dropdownOptions: [
        { label: 'Brand 1', value: 1 },
        { label: 'Brand 2', value: 2 },
        { label: 'Brand 3', value: 3 }
      ]
    },
    {
      name: 'categoriesIds',
      label: 'Categories',
      type: 'dropdown',
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      maxDropdownSelections: 3,
      dropdownOptions: [
        { label: 'Category 1', value: 1 },
        { label: 'Category 2', value: 2 },
        { label: 'Category 3', value: 3 },
        { label: 'Category 4', value: 4 },
        { label: 'Category 5', value: 5 }
      ]
    }
  ]

  constructor(
    private readonly articleService: ArticleService,
    toastService: ToastService
  ) {
    super(toastService);
  }

  onSubmit(articleToCreate: CreateArticleRequestDTO) {
    this.handleFormSubmit(
      () => this.articleService.createArticle(articleToCreate),
      'Article created successfully',
      'Error creating article',
      () => this.articleService.notifyArticleCreated()
    );
  }

}
