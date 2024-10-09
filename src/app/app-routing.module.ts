import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/templates/main-layout/main-layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './components/templates/admin-layout/admin-layout.component';
import { CreateCategoryComponent } from './components/pages/categories/create-category/create-category.component';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { title: 'Home', breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { title: 'Home', breadcrumb: 'Home' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    data: { title: 'Admin', breadcrumb: 'Admin' },
    children: [
      {
        path: 'categories',
        component: ListCategoriesComponent,
        data: { title: 'Categories', breadcrumb: 'Categories' },
      },
      {
        path: 'categories/create',
        component: CreateCategoryComponent,
        data: { title: 'Create Category', breadcrumb: 'Create Category' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
