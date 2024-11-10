import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthReponseDTO, LoginRequestDTO, Role, UserDetails } from '@/domain/models/Auth';
import { TOKEN_LOCAL_STORAGE_KEY } from '@/domain/utils/constants/Auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token in localStorage', () => {
    const loginRequest: LoginRequestDTO = {
      email: 'test@example.com',
      password: 'password123',
    };

    const authResponse: AuthReponseDTO = {
      token: 'fake-jwt-token',
      role: Role.ADMIN,
    };

    service.login(loginRequest).subscribe((response) => {
      expect(response).toEqual(authResponse);
      expect(localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)).toBe(authResponse.token);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);
    req.flush(authResponse);
  });

  it('should return user details from token', () => {
    const userDetails: UserDetails = {
      id: 1,
      role: Role.ADMIN,
    };

    const token = btoa(JSON.stringify(userDetails));
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, `header.${token}.signature`);

    const result = service.userDetails();
    expect(result).toEqual(userDetails);
  });

  it('should return null if no token is present', () => {
    const result = service.userDetails();
    expect(result).toBeNull();
  });

  it('should remove token from localStorage on logout', () => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, 'fake-jwt-token');
    service.logout();
    expect(localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)).toBeNull();
  });
});