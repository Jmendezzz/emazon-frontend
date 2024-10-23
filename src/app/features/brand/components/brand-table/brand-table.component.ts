import { BRAND_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Paginated } from '@/domain/models/Paginated';
import { Brand } from '@/domain/models/Brand';
import { PaginationService } from '@/shared/services/ui/pagination.service';

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.scss'],
})
export class BrandTableComponent implements OnInit {
  headers = BRAND_TABLE_HEADERS;
  brands: Paginated<Brand> | undefined = undefined;
  isLoading: boolean = false;

  constructor(
    private readonly brandService: BrandService,
    private readonly paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.onBrandCreated();
  }

  loadBrands() {
    this.isLoading = true;
    this.paginationService.getPaginationParams().subscribe(({ pagination, sorting }) => {
        this.brandService.getBrands(pagination, sorting).subscribe({
          next: (brands) => {
            this.brands = brands;
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
          },
        });
      });
  }

  onBrandCreated() {
    this.brandService.onBrandCreated$.subscribe(() => {
      this.loadBrands();
    });
  }
}
