import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/pages/categories/list-categories/list-categories.component';
import { MainLayoutComponent } from './components/templates';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './features/admin/components';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
