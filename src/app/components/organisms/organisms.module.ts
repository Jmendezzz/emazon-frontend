import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcumbComponent,
  TableComponent,
  ToastComponent,
} from '@/components/organisms';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [BreadcumbComponent, TableComponent, ToastComponent],
  imports: [CommonModule, MoleculesModule, AtomsModule],
  exports: [BreadcumbComponent, TableComponent, ToastComponent],
})
export class OrganismsModule {}
