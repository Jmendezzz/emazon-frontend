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
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';

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
    NotFoundPageComponent
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
