import { CreateWarehousePageComponent } from '@/components/pages/users/create-warehouse-page/create-warehouse-page.component';
import { WarehouseListPageComponent } from '@/components/pages/users/warehouse-list-page/warehouse-list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'warehouses/create',
    component: CreateWarehousePageComponent,
    data: { title: 'Create Warehouse', breadcrumb: 'Create Warehouse' },
  },
  {
    path: 'warehouses',
    component: WarehouseListPageComponent,
    data: { title: 'Warehouses', breadcrumb: 'Warehouses' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
