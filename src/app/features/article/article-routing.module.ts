import { ListArticlesComponent } from '@/components/pages/articles/list-articles/list-articles.component';
import { Role } from '@/domain/models/Auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesComponent,
    data: { title: 'Articles', breadcrumb: 'Articles',roles:[Role.ADMIN, Role.WAREHOUSE_ASSISTANT] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
