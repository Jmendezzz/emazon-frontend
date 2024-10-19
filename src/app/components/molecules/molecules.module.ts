import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InputFormRowComponent,
  ModalComponent,
  PaginationComponent,
  SidebarComponent,
  NavbarComponent,
} from '@/components/molecules';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule],
  exports: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
  ],
})
export class MoleculesModule {}
