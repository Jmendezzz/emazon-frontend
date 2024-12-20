import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/templates';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './features/admin/components';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AnonymousGuard } from './shared/guards/anonymous.guard';
import { ListCustomerArticlesComponent } from './components/pages/articles/list-customer-articles/list-customer-articles.component';
import { RoleGuard } from './shared/guards/role.guard';
import { Role } from './domain/models/Auth';

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
        path: '',
        canActivate: [AnonymousGuard],
        loadChildren: () =>
          import('./features/authentication/auth.module').then(
            (m) => m.AuthModule
          ),
        data: { title: 'Login', breadcrumb: 'Login' },
      },
      {
        path: 'products',
        component: ListCustomerArticlesComponent,
        data: { title: 'Products', breadcrumb: 'Products' },
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module').then((m) => m.CartModule),
        data: { title: 'Cart', breadcrumb: 'Cart' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { title: 'Admin', breadcrumb: 'Admin', roles:[Role.ADMIN, Role.WAREHOUSE_ASSISTANT]},
    children: [
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./features/brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./features/article/article.module').then(
            (m) => m.ArticleModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
      },
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
