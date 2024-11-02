import { BRAND_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Paginated } from '@/domain/models/Paginated';
import { Brand } from '@/domain/models/Brand';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.scss'],
})
export class BrandTableComponent implements OnInit, OnDestroy {
  headers = BRAND_TABLE_HEADERS;
  brands: Paginated<Brand> | undefined = undefined;
  isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();


  constructor(
    private readonly brandService: BrandService,
    private readonly paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.onBrandCreated();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadBrands() {
    this.isLoading = true;
    this.paginationService.getPaginationParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ pagination, sorting }) => {
        this.brandService.getBrands(pagination, sorting)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (brands) => {
              this.brands = brands;
              this.isLoading = false;
            },
            error: () => {
              this.isLoading = false;
            }
          });
      });
  }


  onBrandCreated() {
    this.brandService.onBrandCreated$.subscribe(() => {
      this.loadBrands();
    });
  }
}
