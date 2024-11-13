import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { AuthService } from './services/auth.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from '@/components/pages/auth/login-page/login-page.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { SignupPageComponent } from '@/components/pages/auth/signup-page/signup-page.component';


@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent, SignupFormComponent, AuthLayoutComponent, SignupPageComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    CommonModule,
    AuthRoutingModule
  ],
  exports: [LoginPageComponent, SignupPageComponent],
  providers: [AuthService]
})
export class AuthModule { }
