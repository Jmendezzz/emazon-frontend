import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AuthReponseDTO,
  LoginRequestDTO,
  UserDetails,
} from '@/domain/models/Auth';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TOKEN_LOCAL_STORAGE_KEY } from '@/domain/utils/constants/Auth';
import { User } from '@/domain/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiURL = `${environment.userServiceUrl}/api/v1/auth`;

  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginRequestDTO): Observable<AuthReponseDTO> {
    return this.httpClient
      .post<AuthReponseDTO>(`${this.apiURL}/login`, loginRequest)
      .pipe(
        map((response) => {
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, response.token);
          return response;
        })
      );
  }

  userDetails(): UserDetails | null {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (!token) return null;

    return JSON.parse(atob(token.split('.')[1]));
  }

  logout() {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  }
}
