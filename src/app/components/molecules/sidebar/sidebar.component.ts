import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed = false;

  constructor() {}

  onToggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
