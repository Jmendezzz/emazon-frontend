import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/templates';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './features/admin/components';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';

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
      {
        path: 'login',
        loadChildren: () => import('./features/authentication/auth.module').then(m => m.AuthModule),
        data: { title: 'Login', breadcrumb: 'Login' },
      }
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    data: { title: 'Admin', breadcrumb: 'Admin' },
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'brands',
        loadChildren: () => import('./features/brand/brand.module').then(m => m.BrandModule),
      },
      {
        path: 'articles',
        loadChildren: () => import('./features/article/article.module').then(m => m.ArticleModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
      }
    ],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: '404', breadcrumb: '404' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
