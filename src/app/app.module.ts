import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NavbarComponent } from './components/molecules/navbar/navbar.component';
import { MainLayoutComponent } from './components/templates/main-layout/main-layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SectionComponent } from './components/atoms/section/section.component';
import { HeadingComponent } from './components/atoms/heading/heading.component';
import { HamburgerIconComponent } from './components/atoms/hamburger-icon/hamburger-icon.component';
import { SidebarComponent } from './components/molecules/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LinkComponent,
    LogoComponent,
    NavbarComponent,
    MainLayoutComponent,
    HomeComponent,
    SectionComponent,
    HeadingComponent,
    HamburgerIconComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
