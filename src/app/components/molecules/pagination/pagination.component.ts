import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  MIN_PAGE,
  PAGE_OFFSET,
} from 'src/app/domain/utils/constants/Pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalItems!: number;

  constructor(private readonly router: Router) { 
   }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number): void {
    const pageOffset = page - PAGE_OFFSET;
    if (page >= pageOffset && pageOffset <= this.totalPages) {
      this.router.navigate([], {
        queryParams: { page },
        queryParamsHandling: 'merge',
      });
    }
  }
}
