import { ListBrandsComponent } from '@/components/pages/brands/list-brands/list-brands.component';
import { Role } from '@/domain/models/Auth';
import { RoleGuard } from '@/shared/guards/role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: ListBrandsComponent,
    canActivate: [RoleGuard],
    data: { title: 'Brands', breadcrumb: 'Brands', roles: [Role.ADMIN, Role.WAREHOUSE_ASSISTANT] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
