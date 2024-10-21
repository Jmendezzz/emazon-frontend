import { Breadcrumb } from '@/shared/types/common-types';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      }
    });
  }
   createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: this.createLabel(child), url: url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  private createLabel(route: ActivatedRoute): string {
    const routeData = route.snapshot.data;
    if (routeData['breadcrumb']) {
      return routeData['breadcrumb'];
    }
    return '';
  }
}
