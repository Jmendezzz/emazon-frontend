import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@/features/authentication/services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
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
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow navigation if user is authenticated', () => {
    authServiceMock.userDetails.mockReturnValue({ id: 1, name: 'Test User' });

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBe(true);
    expect(authServiceMock.userDetails).toHaveBeenCalled();
  });

  it('should deny navigation and redirect to /login if user is not authenticated', () => {
    authServiceMock.userDetails.mockReturnValue(null);

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(authServiceMock.userDetails).toHaveBeenCalled();
  });
});
