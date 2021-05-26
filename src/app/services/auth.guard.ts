import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      alert('Please log in');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
