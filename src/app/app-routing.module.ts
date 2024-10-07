import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/templates/main-layout/main-layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './components/templates/admin-layout/admin-layout.component';
import { CreateCategoryComponent } from './components/pages/categories/create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{ path: 'categories/create', component: CreateCategoryComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
