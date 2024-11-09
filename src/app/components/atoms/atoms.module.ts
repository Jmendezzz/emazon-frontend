import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputComponent,
  LinkComponent,
  LogoComponent,
  SectionComponent,
  HeadingComponent,
  HamburgerIconComponent,
  TextAreaComponent,
  LoaderComponent,
} from '@/components/atoms';
import { RouterModule } from '@angular/router';
import { InputDateComponent } from './input-date/input-date.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LinkComponent,
    LogoComponent,
    SectionComponent,
    HeadingComponent,
    HamburgerIconComponent,
    TextAreaComponent,
    LoaderComponent,
    InputDateComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonComponent,
    InputComponent,
    LinkComponent,
    LogoComponent,
    SectionComponent,
    HeadingComponent,
    HamburgerIconComponent,
    TextAreaComponent,
    LoaderComponent,
    InputDateComponent
  ],
})
export class AtomsModule {}
