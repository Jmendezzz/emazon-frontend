import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTableComponent } from './components/article-table/article-table.component';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { AdminModule } from '../admin/admin.module';
import { ListArticlesComponent } from '@/components/pages/articles/list-articles/list-articles.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleService } from './services/article.service';
import { CreateArticleFormComponent } from './components/create-article-form/create-article-form.component';
import { CreateArticleModalComponent } from './components/create-article-modal/create-article-modal.component';
import { BrandService } from '../brand/services/brand.service';
import { CategoryService } from '../category/services/category.service';
import { AddArticleSupplyFormComponent } from './components/add-article-supply-form/add-article-supply-form.component';
import { AddArticleSupplyModalComponent } from './components/add-article-supply-modal/add-article-supply-modal.component';
import { SharedModule } from '@/shared/shared.module';
import { ListCustomerArticlesComponent } from '@/components/pages/articles/list-customer-articles/list-customer-articles.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { CartModule } from '../cart/cart.module';
import { ArticleFilterComponent } from './components/article-filter/article-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ArticleTableComponent,
    ListArticlesComponent,
    CreateArticleFormComponent,
    CreateArticleModalComponent,
    AddArticleSupplyFormComponent,
    AddArticleSupplyModalComponent,
    ListCustomerArticlesComponent,
    ArticleListComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    AdminModule,
    ArticleRoutingModule,
    SharedModule,
    CartModule,
    ReactiveFormsModule
  ],
  exports: [ListArticlesComponent, ListCustomerArticlesComponent],
  providers: [ArticleService, BrandService, CategoryService],
})
export class ArticleModule {}
