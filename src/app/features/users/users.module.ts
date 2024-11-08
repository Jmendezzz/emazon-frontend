import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousesTableComponent } from './components/warehouses-table/warehouses-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { AdminModule } from '../admin/admin.module';
import { UserService } from './services/user.service';
import { WarehouseListPageComponent } from '@/components/pages/users/warehouse-list-page/warehouse-list-page.component';
import { UserRoutingModule } from './user-routing.module';
import { CreateWarehouseButtonComponent } from './create-warehouse-button/create-warehouse-button.component';
import { CreateWarehousePageComponent } from '@/components/pages/create-warehouse-page/create-warehouse-page.component';

@NgModule({
  declarations: [
    WarehousesTableComponent,
    WarehouseListPageComponent,
    CreateWarehouseButtonComponent,
    CreateWarehousePageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule,
    AdminModule,
    UserRoutingModule,
  ],
  providers: [UserService],
  exports: [WarehouseListPageComponent, CreateWarehousePageComponent],
})
export class UsersModule {}
