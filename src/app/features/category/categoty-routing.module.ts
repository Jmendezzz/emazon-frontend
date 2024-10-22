import { ListCategoriesComponent } from '@/components/pages/categories/list-categories/list-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent,
    data: { title: 'Categories', breadcrumb: 'Categories' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategotyRoutingModule { }
