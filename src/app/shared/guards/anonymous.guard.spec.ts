import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AnonymousGuard } from './anonymous.guard';
import { AuthService } from '@/features/authentication/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      userDetails: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AnonymousGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AnonymousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is not authenticated', () => {
    authServiceMock.userDetails.mockReturnValue(null);

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBe(true);
  });

  it('should prevent activation and redirect to home if user is authenticated', () => {
    authServiceMock.userDetails.mockReturnValue({ id: 1, name: 'Test User' });

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});