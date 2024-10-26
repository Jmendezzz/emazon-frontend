import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandTableComponent } from './components/brand-table/brand-table.component';
import { BrandService } from './services/brand.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { AdminModule } from '../admin/admin.module';
import { ListBrandsComponent } from '@/components/pages/brands/list-brands/list-brands.component';
import { BrandRoutingModule } from './brand-routing.module';
import { CreateBrandFormComponent } from './components/create-brand-form/create-brand-form.component';
import { CreateBrandModalComponent } from './components/create-brand-modal/create-brand-modal.component';
import { PaginationService } from '@/shared/services/ui/pagination.service';

@NgModule({
  declarations: [
    BrandTableComponent,
    ListBrandsComponent,
    CreateBrandFormComponent,
    CreateBrandModalComponent,
    CreateBrandModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule,
    AdminModule,
    BrandRoutingModule,
  ],
  providers: [BrandService, PaginationService],
  exports: [ListBrandsComponent],
})
export class BrandModule {}
