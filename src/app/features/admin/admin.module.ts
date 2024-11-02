import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AdminLayoutComponent,
  AdminNavbarComponent,
  AdminSectionComponent
} from "@/features/admin/components";
import { RouterModule } from '@angular/router';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { AtomsModule } from '@/components/atoms/atoms.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrganismsModule,
    MoleculesModule,
    AtomsModule
  ],
  exports: [
    AdminLayoutComponent,
    AdminSectionComponent
  ]
})
export class AdminModule { }
