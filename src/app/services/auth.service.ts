import { UserApi } from './../shared/sdk/services/custom/User';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  options = {
    theme: {
      logo: 'http://www.luniverza.si/templates/default/images/logo.png',
      primaryColor: 'orange'
    },
    languageDictionary: {
      emailInputPlaceholder: "naslov@naslov.moj",
      title: "Meksis",
      notYourAccountAction: "Ni pravi račun?",
      lastLoginInstructions: "Nazadnje ste se prijavili s tem računom:",
      loginLabel: "Prijava",
      loginSubmitLabel: "Prijava",
      passwordInputPlaceholder: "geslo",
      signUpLabel: "Registracija",
      signUpSubmitLabel: "Registracija",
      forgotPasswordAction: "Pozabljeno geslo?",
      blankErrorHint: "Polje ne sme biti prazno",
      invalidErrorHint: "Napaka",
      error: {
        login: {
          "lock.invalid_email_password": "Napačen naslov ali geslo!"
        }
      }
    }
  };

  lock = new Auth0Lock('C8N6YmVdflmlYRRCJCZPmu4uGoKWCouD', 'jsoftl.eu.auth0.com', this.options);

  //Store profile object in auth class
  userProfile: Object;

  constructor(
    private _router: Router,
    private _api: UserApi) {

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

        this._api.login({
          "username": this.userProfile['name'],
          "password": this.userProfile['user_id']
        }).subscribe(res => this.passthru(res), res => this.passthru(res));

      });

      this.lock.hide();
    });
  }

  passthru(res) {
    if (res.code == "LOGIN_FAILED") {
      this._api.create({
        "username": this.userProfile['name'],
        "password": this.userProfile['user_id'],
        "email": this.userProfile['email']
      }).subscribe(res => {
        this._api.login({
          "username": this.userProfile['name'],
          "password": this.userProfile['user_id']
        }).subscribe(res => console.log(2, res));
      });
    }
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
    this._router.navigateByUrl('/home');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
