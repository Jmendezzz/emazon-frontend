import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-warehouse-button',
  templateUrl: './create-warehouse-button.component.html',
  styleUrls: ['./create-warehouse-button.component.scss']
})
export class CreateWarehouseButtonComponent {

  constructor(private readonly router:Router) { }

  createWarehouseHandler() {
    this.router.navigateByUrl('/users/warehouses/create');
  }

}
