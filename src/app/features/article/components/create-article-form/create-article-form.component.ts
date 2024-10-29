import { CreateArticleRequestDTO } from '@/domain/models/Article';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component} from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FormField } from '@/domain/models/Form';

@Component({
  selector: 'app-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss']
})
export class CreateArticleFormComponent extends AbstractFormHandler<CreateArticleRequestDTO> {
  fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      validators: [],
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'number',
      validators: [],
    },
    {
      name: 'brandId',
      label: 'Brand',
      type: 'dropdown',
      validators: [],
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
      validators: [],
      maxDropdownSelections: 3,
      dropdownOptions: [
        { label: 'Category 1', value: 1 },
        { label: 'Category 2', value: 2 },
        { label: 'Category 3', value: 3 }
      ]
    }
  ]

  constructor(
    private readonly articleService: ArticleService,
    toastService: ToastService
  ) {
    super(toastService);
  }

}
