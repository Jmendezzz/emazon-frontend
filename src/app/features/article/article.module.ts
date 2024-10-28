import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTableComponent } from './components/article-table/article-table.component';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';



@NgModule({
  declarations: [
    ArticleTableComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ]
})
export class ArticleModule { }
