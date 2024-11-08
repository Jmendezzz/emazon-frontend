import { USERS_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Paginated } from '@/domain/models/Paginated';
import { User } from '@/domain/models/User';
import { PaginationService } from '@/shared/services/ui/pagination.service';

@Component({
  selector: 'app-warehouses-table',
  templateUrl: './warehouses-table.component.html',
  styleUrls: ['./warehouses-table.component.scss'],
})
export class WarehousesTableComponent implements OnInit {
  headers = USERS_TABLE_HEADERS;
  warehouses: Paginated<Partial<User>> | undefined = undefined;
  isLoading = false;
  constructor(
    private readonly paginationService: PaginationService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.isLoading = true;
    this.paginationService
      .getPaginationParams()
      .subscribe(({ pagination, sorting }) => {
        this.userService.getWarehouses(pagination).subscribe({
          next: (warehouses) => {
            this.warehouses = this.formatWarehouses(warehouses);
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        });
      });
  }

  formatWarehouses(warehouses: Paginated<User>): Paginated<Partial<User>> {
    return {
      ...warehouses,
      data: warehouses.data.map((warehouse) => ({
        id: warehouse.id,
        firstName: warehouse.firstName,
        lastName: warehouse.lastName,
        email: warehouse.email,
      })),
    };
  }
}
