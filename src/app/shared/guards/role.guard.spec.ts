import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';
import { AuthService } from '@/features/authentication/services/auth.service';
import { Router } from '@angular/router';
import { Role } from '@/domain/models/Auth';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      userDetails: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn().mockReturnValue(of(true)),
    };

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should allow navigation if user has the required role', () => {
    authServiceMock.userDetails.mockReturnValue({ id: 1, name: 'Test User', role: Role.ADMIN });

    const mockRoute = { data: { role: Role.ADMIN } } as unknown as ActivatedRouteSnapshot;
    const result = guard.canActivate(mockRoute, {} as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(authServiceMock.userDetails).toHaveBeenCalled();
  });

  it('should deny navigation and redirect to / if user does not have the required role', () => {
    authServiceMock.userDetails.mockReturnValue({ id: 1, name: 'Test User', role: Role.USER });

    const mockRoute = { data: { role: Role.ADMIN } } as unknown as ActivatedRouteSnapshot;
    const result = guard.canActivate(mockRoute, {} as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(authServiceMock.userDetails).toHaveBeenCalled();
  });

  it('should deny navigation and redirect to / if user is not authenticated', () => {
    authServiceMock.userDetails.mockReturnValue(null);

    const mockRoute = { data: { role: Role.ADMIN } } as unknown as ActivatedRouteSnapshot;
    const result = guard.canActivate(mockRoute, {} as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(authServiceMock.userDetails).toHaveBeenCalled();
  });
});
