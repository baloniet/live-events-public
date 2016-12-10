import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock('C8N6YmVdflmlYRRCJCZPmu4uGoKWCouD', 'jsoftl.eu.auth0.com');

  //Store profile object in auth class
  userProfile: Object;

  constructor(private _router: Router) {

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });

      this.lock.hide();
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.userProfile = undefined;

    // Send the user back to the dashboard after logout
    this._router.navigateByUrl('/');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
