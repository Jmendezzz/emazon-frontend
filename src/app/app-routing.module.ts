import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './features/category/components/pages/list-categories/list-categories.component';
import { MainLayoutComponent } from './shared/components/templates/main-layout/main-layout.component';
import { HomeComponent } from './shared/components/pages/home/home.component';
import { AdminLayoutComponent } from './shared/components/templates/admin-layout/admin-layout.component';

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
