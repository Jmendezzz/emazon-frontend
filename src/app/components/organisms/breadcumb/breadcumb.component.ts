import { BreadcrumbService } from '@/shared/services/ui/breadcrumb.service';
import { Breadcrumb } from '@/shared/types/common-types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private readonly breadcumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }

}
