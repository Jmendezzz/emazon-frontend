import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { Breadcrumb } from 'src/app/shared/types/common-types';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbs = this.breadcumbService.breadcrumbs;
  }

}
