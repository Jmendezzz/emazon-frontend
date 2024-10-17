import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryFormComponent } from './components/molecules/create-category-form/create-category-form.component';
import { CategoryTableComponent } from './components/organisms/category-table/category-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { CategoryService } from './services/category.service';
import { ToastService } from 'src/app/shared/services/ui/toast.service';
import { ModalService } from 'src/app/shared/services/ui/modal.service';
import { CreateCategoryModalComponent } from './components/organisms/create-category-modal/create-category-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreateCategoryFormComponent,
    CategoryTableComponent,
    CreateCategoryModalComponent,
    ListCategoriesComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedModule, ReactiveFormsModule],
  exports: [ListCategoriesComponent],
  providers: [CategoryService, ToastService, ModalService],
})
export class CategoryModule {}
