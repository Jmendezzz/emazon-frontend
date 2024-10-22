import { ADMIN_SIDEBAR_ITEMS } from '@/domain/utils/constants/Sidebar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  sidebarItems = ADMIN_SIDEBAR_ITEMS;
  constructor() {}
}
