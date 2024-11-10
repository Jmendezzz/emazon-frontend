import { Role } from '@/domain/models/Auth';
import { AuthService } from '@/features/authentication/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userDetails();
    const requiredRole = next.data['role'] as Role;

    if (user && user.role === requiredRole) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
