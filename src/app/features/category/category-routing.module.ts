import { ListCategoriesComponent } from '@/components/pages/categories/list-categories/list-categories.component';
import { Role } from '@/domain/models/Auth';
import { RoleGuard } from '@/shared/guards/role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent,
    canActivate: [RoleGuard],
    data: { title: 'Categories', breadcrumb: 'Categories', roles:[Role.ADMIN, Role.WAREHOUSE_ASSISTANT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
