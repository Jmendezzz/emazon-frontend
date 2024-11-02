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
  ],
})
export class AtomsModule {}
