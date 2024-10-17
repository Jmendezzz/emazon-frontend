import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AdminLayoutComponent } from './components/templates/admin-layout/admin-layout.component';
import { AdminSectionComponent } from './components/molecules/admin-section/admin-section.component';
import { BreadcumbComponent } from './components/organisms/breadcumb/breadcumb.component';
import { InputComponent } from './components/atoms/input/input.component';
import { AdminNavbarComponent } from './components/organisms/admin-navbar/admin-navbar.component';
import { InputFormRowComponent } from './components/molecules/input-form-row/input-form-row.component';
import { TableComponent } from './components/organisms/table/table.component';
import { ModalComponent } from './components/molecules/modal/modal.component';
import { TextAreaComponent } from './components/atoms/text-area/text-area.component';
import { PaginationComponent } from './components/molecules/pagination/pagination.component';
import { LoaderComponent } from './components/atoms/loader/loader.component';
import { ToastComponent } from './components/molecules/toast/toast.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ButtonComponent,
    LinkComponent,
    LogoComponent,
    NavbarComponent,
    MainLayoutComponent,
    HomeComponent,
    SectionComponent,
    HeadingComponent,
    HamburgerIconComponent,
    SidebarComponent,
    AdminLayoutComponent,
    AdminSectionComponent,
    BreadcumbComponent,
    InputComponent,
    AdminNavbarComponent,
    InputFormRowComponent,
    TableComponent,
    ModalComponent,
    TextAreaComponent,
    PaginationComponent,
    LoaderComponent,
    ToastComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule],
  exports: [
    ButtonComponent,
    LinkComponent,
    LogoComponent,
    NavbarComponent,
    MainLayoutComponent,
    HomeComponent,
    SectionComponent,
    HeadingComponent,
    HamburgerIconComponent,
    SidebarComponent,
    AdminLayoutComponent,
    AdminSectionComponent,
    BreadcumbComponent,
    InputComponent,
    AdminNavbarComponent,
    InputFormRowComponent,
    TableComponent,
    ModalComponent,
    TextAreaComponent,
    PaginationComponent,
    LoaderComponent,
    ToastComponent
  ],
})
export class SharedModule {}
