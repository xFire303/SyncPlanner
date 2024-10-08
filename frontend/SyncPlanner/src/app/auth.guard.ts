import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isLoggedIn()) {
      if (state.url === '/') {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (state.url !== '/') {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
