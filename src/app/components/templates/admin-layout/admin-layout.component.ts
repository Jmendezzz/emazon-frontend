import { Component } from '@angular/core';
import { ADMIN_SIDEBAR_ITEMS } from 'src/app/domain/utils/constants/Sidebar';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  sidebarItems = ADMIN_SIDEBAR_ITEMS;
  constructor() {}
}
