import { ListBrandsComponent } from '@/components/pages/brands/list-brands/list-brands.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: ListBrandsComponent,
    data: { title: 'Brands', breadcrumb: 'Brands' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
