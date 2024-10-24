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
import { FormComponent } from './form/form.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
    FormComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule],
  exports: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
    FormComponent
  ],
})
export class MoleculesModule {}
