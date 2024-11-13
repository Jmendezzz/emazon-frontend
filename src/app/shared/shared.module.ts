import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOnlyDirective } from './directives/admin-only.directive';
import { AuthService } from '@/features/authentication/services/auth.service';



@NgModule({
  declarations: [AdminOnlyDirective],
  imports: [
    CommonModule,
  ],
  providers: [AuthService],
  exports: [AdminOnlyDirective]
})
export class SharedModule { }
