import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url);
    if (this.authService.currentUser) {
      if (state.url == '/login') {
        this.router.navigate(['/']);
      }
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { to: state.url } });
    return false;
  }
}
