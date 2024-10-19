import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminNavbarComponent } from '../../molecules/admin-navbar/admin-navbar.component';
import { BreadcumbComponent } from '@/components/organisms';
import { SidebarComponent } from '@/components/molecules';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutComponent, AdminNavbarComponent, BreadcumbComponent, SidebarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
