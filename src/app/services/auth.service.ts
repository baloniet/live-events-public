import { LeUser } from './../shared/sdk/models/LeUser';
import { LeUserApi } from './../shared/sdk/services/custom/LeUser';
import { UserApi } from './../shared/sdk/services/custom/User';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
var moment = require('../../assets/js/moment.min.js');

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
      title: "VGCCRM",
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
    private _api: UserApi,
    private _leUser: LeUserApi) {

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.updateUser(this.userProfile);

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
        }).subscribe(res => {
          this._leUser.findById(this.userProfile['user_id'])
            .subscribe(res => {
              // update last login timestamp
              this.updateUser(this.userProfile);
            }, err => {
              // insert user into database
              let leUser = new LeUser;
              leUser.email = this.userProfile['email'];
              leUser.name = this.userProfile['nickname'];
              leUser.auth0Id = this.userProfile['user_id'];
              this._leUser.upsert(leUser)
                .subscribe(null, err => console.log(err));
            });
        });
      });
    } else {
      // update last login timestamp
      this.updateUser(this.userProfile);
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

  private updateUser(profile) {
    this._leUser.updateAll({ auth0Id: profile.user_id }, { ldate: moment() })
      .subscribe(null, err => console.log(err));
  }

}
