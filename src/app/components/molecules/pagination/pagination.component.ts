import { MIN_PAGE } from '@/domain/utils/constants/Pagination';
import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalItems!: number;

  constructor(private readonly router: Router, private readonly ngZone:NgZone) {}

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= MIN_PAGE && page <= this.totalPages) {
      if (page !== this.currentPage) {
        this.ngZone.run(() => {
          this.router.navigate([], {
            queryParams: { page },
            queryParamsHandling: 'merge',
          });
        });
      }
      this.currentPage = page;
    }
  }
}
