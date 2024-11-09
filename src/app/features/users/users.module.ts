import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousesTableComponent } from './components/warehouses-table/warehouses-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { AdminModule } from '../admin/admin.module';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';
import { WarehouseListPageComponent } from '@/components/pages/users/warehouse-list-page/warehouse-list-page.component';
import { CreateWarehouseButtonComponent } from './components/create-warehouse-button/create-warehouse-button.component';
import { CreateWarehousePageComponent } from '@/components/pages/users/create-warehouse-page/create-warehouse-page.component';
import { CreateWarehouseFormComponent } from './components/create-warehouse-form/create-warehouse-form.component';


@NgModule({
  declarations: [
    WarehousesTableComponent,
    WarehouseListPageComponent,
    CreateWarehouseButtonComponent,
    CreateWarehousePageComponent,
    CreateWarehouseFormComponent,
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
