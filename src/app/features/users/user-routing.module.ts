import { CreateWarehousePageComponent } from '@/components/pages/users/create-warehouse-page/create-warehouse-page.component';
import { WarehouseListPageComponent } from '@/components/pages/users/warehouse-list-page/warehouse-list-page.component';
import { Role } from '@/domain/models/Auth';
import { RoleGuard } from '@/shared/guards/role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'warehouses/create',
    component: CreateWarehousePageComponent,
    canActivate: [RoleGuard],
    data: { title: 'Create Warehouse', breadcrumb: 'Create Warehouse', roles: [Role.ADMIN] },
  },
  {
    path: 'warehouses',
    component: WarehouseListPageComponent,
    canActivate: [RoleGuard],
    data: { title: 'Warehouses', breadcrumb: 'Warehouses', roles: [Role.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
