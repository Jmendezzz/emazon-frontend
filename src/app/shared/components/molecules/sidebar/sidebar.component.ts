import { Component, Input } from '@angular/core';
import { SidebarItem } from 'src/app/domain/models/Sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidebarItems: SidebarItem[] = [];
  isCollapsed = false;

  constructor() {}

  onToggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
