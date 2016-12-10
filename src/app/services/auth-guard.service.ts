import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {

  constructor(
    private _auth: AuthService,
    private _router: Router) { }

  canActivate() {
    if (!this._auth.loggedIn()) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }

}
