import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOnlyDirective } from './directives/admin-only.directive';
import { AuthService } from '@/features/authentication/services/auth.service';
import { ArticleFilterComponent } from '@/features/article/components/article-filter/article-filter.component';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminOnlyDirective, ArticleFilterComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  exports: [AdminOnlyDirective, ArticleFilterComponent]
})
export class SharedModule { }
