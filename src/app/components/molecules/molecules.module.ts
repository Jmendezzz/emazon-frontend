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
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
    FormComponent,
    DropdownComponent,
    FooterComponent,
    ListComponent,
  ],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule, RouterModule],
  exports: [
    InputFormRowComponent,
    ModalComponent,
    PaginationComponent,
    SidebarComponent,
    NavbarComponent,
    FormComponent,
    FooterComponent,
    ListComponent,
    DropdownComponent
  ],
})
export class MoleculesModule {}
