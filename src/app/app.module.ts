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
import { AdminLayoutComponent } from './components/templates/admin-layout/admin-layout.component';
import { CreateCategoryComponent } from './components/pages/categories/create-category/create-category.component';
import { AdminSectionComponent } from './components/molecules/admin-section/admin-section.component';
import { BreadcumbComponent } from './components/organisms/breadcumb/breadcumb.component';
import { InputComponent } from './components/atoms/input/input.component';
import { AdminNavbarComponent } from './components/organisms/admin-navbar/admin-navbar.component';
import { InputFormRowComponent } from './components/molecules/input-form-row/input-form-row.component';
import { CreateCategoryFormComponent } from './components/organisms/create-category-form/create-category-form.component';
import { TableComponent } from './components/molecules/table/table.component';
import { CategoryTableComponent } from './components/organisms/category-table/category-table.component';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { ModalComponent } from './components/molecules/modal/modal.component';
import { CreateCategoryModalComponent } from './components/organisms/create-category-modal/create-category-modal.component';
import { TextAreaComponent } from './components/atoms/text-area/text-area.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    SidebarComponent,
    AdminLayoutComponent,
    CreateCategoryComponent,
    AdminSectionComponent,
    BreadcumbComponent,
    InputComponent,
    AdminNavbarComponent,
    InputFormRowComponent,
    CreateCategoryFormComponent,
    TableComponent,
    CategoryTableComponent,
    ListCategoriesComponent,
    ModalComponent,
    CreateCategoryModalComponent,
    TextAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
