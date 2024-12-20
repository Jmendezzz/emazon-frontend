import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isCollapsed as false', () => {
    expect(component.isCollapsed).toBe(false);
  });

  it('should toggle isCollapsed when onToggleSidebar is called', () => {
    component.onToggleSidebar();
    expect(component.isCollapsed).toBe(true);
    
    component.onToggleSidebar();
    expect(component.isCollapsed).toBe(false);
  });
});
