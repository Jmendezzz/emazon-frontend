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



@NgModule({
  declarations: [BrandTableComponent, ListBrandsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule,
    AdminModule,
    BrandRoutingModule
  ],
  providers:[BrandService],
  exports:[ListBrandsComponent]
})
export class BrandModule { }
