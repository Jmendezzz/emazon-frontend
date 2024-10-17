import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryFormComponent } from './components/molecules/create-category-form/create-category-form.component';
import { CategoryTableComponent } from './components/organisms/category-table/category-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CreateCategoryFormComponent,
    CategoryTableComponent,
    CreateCategoryModalComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CategoryModule { }
