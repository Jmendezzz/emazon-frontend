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
import { LogoutButtonComponent } from './logout-button/logout-button.component';

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
    LogoutButtonComponent,
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
    InputDateComponent,
    LogoutButtonComponent
  ],
})
export class AtomsModule {}
