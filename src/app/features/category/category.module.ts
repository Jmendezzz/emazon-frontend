import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { CategoryTableComponent } from './components/organisms/category-table/category-table.component';
import { ListCategoriesComponent } from '@/components/pages/categories/list-categories/list-categories.component';
import { CreateCategoryFormComponent } from './components/molecules/create-category-form/create-category-form.component';
import { CreateCategoryModalComponent } from './components/organisms/create-category-modal/create-category-modal.component';
import { CategoryService } from './services/category.service';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [
    CreateCategoryFormComponent,
    CategoryTableComponent,
    CreateCategoryModalComponent,
    ListCategoriesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule,
    AdminModule
  ],
  exports: [ListCategoriesComponent],
  providers: [CategoryService],
})
export class CategoryModule {}
