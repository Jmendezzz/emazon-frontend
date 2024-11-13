import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { HomeComponent } from '@/components/pages/home/home.component';



@NgModule({
  declarations: [
    HeroSectionComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule
  ]
})
export class HomeModule { }
