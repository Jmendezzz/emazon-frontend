import { SidebarItem } from '@/domain/models/Sidebar';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidebarItems: SidebarItem[] = [];
  isCollapsed = false;
  isVisible = false; 

  constructor() {}

  onToggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}