import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '@/components/templates';
import { RouterModule } from '@angular/router';
import { MoleculesModule } from '../molecules/molecules.module';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MoleculesModule,
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class TemplatesModule { }
