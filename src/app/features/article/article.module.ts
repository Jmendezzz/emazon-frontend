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



@NgModule({
  declarations: [
    ArticleTableComponent, ListArticlesComponent, CreateArticleFormComponent, CreateArticleModalComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    AdminModule,
    ArticleRoutingModule
  ],
  exports: [
    ListArticlesComponent
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
