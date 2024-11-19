import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleSearchCriteria } from '@/domain/models/Article';
import { DropdownOption } from '@/components/molecules/dropdown/dropdown-types';
import { CategoryService } from '@/features/category/services/category.service';
import { BrandService } from '@/features/brand/services/brand.service';

@Component({
  selector: 'app-article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.scss']
})
export class ArticleFilterComponent implements OnInit {
  @Output() searchCriteriaChanged = new EventEmitter<ArticleSearchCriteria>();

  filterForm: FormGroup;
  categoryDropdownOptions: DropdownOption[] = [];
  brandDropdownOptions: DropdownOption[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ) {
    this.filterForm = this.fb.group({
      categoryId: [null],
      brandId: [null]
    });
  }

  ngOnInit(): void {
    this.loadCategoryDropdownOptions();
    this.loadBrandDropdownOptions();

    this.filterForm.valueChanges.subscribe((values) => {
      this.emitSearchCriteria(values);
    });
  }

  loadCategoryDropdownOptions() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryDropdownOptions = categories.map((category) => ({
        label: category.name,
        value: category.id
      }));
    });
  }

  loadBrandDropdownOptions() {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.brandDropdownOptions = brands.map((brand) => ({
        label: brand.name,
        value: brand.id
      }));
    });
  }

  emitSearchCriteria(values: any) {
    const searchCriteria: ArticleSearchCriteria = {
      categoryId: values.categoryId,
      brandId: values.brandId
    };
    this.searchCriteriaChanged.emit(searchCriteria);
  }


  onSubmit() {
    this.emitSearchCriteria(this.filterForm.value);
  }
}