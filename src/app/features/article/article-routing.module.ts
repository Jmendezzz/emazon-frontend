import { ListArticlesComponent } from '@/components/pages/articles/list-articles/list-articles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesComponent,
    data: { title: 'Articles', breadcrumb: 'Articles' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
