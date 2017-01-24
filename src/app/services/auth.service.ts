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
    },
    auth: {
      redirect: false
    }
  };



  lock = new Auth0Lock('C8N6YmVdflmlYRRCJCZPmu4uGoKWCouD', 'jsoftl.eu.auth0.com', this.options);


  //Store profile object in auth class
  userProfile: Object;

  constructor(
    private _router: Router,
    private _api: UserApi,
    private _leUser: LeUserApi) {


    /*    localStorage.removeItem('profile');
        localStorage.removeItem('app_le_user');
        localStorage.removeItem('id_token');*/

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    console.log('This is user profile: ', this.userProfile);

    

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      console.log("Lock is on, auth data: " + authResult);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        console.log('This is user new profile: ', this.userProfile);

        this.slLogin();

      });

      this.lock.hide();
      console.log('Lock is hidden.');
    });

  }

  passthru(res) {

    if (res.code == "LOGIN_FAILED") {
      console.log('passthru: ', res.code);

      this._api.create({
        "username": this.userProfile['name'],
        "password": this.userProfile['user_id'],
        "email": this.userProfile['email']
      }).subscribe(res => {
        console.log('passthru, user created: ', res);
        this._api.login({
          "username": this.userProfile['name'],
          "password": this.userProfile['user_id']
        }).subscribe(res => {
          console.log('passthru, user logged in: ', res);
          this._leUser.findById(this.userProfile['user_id'])
            .subscribe(res => {
              console.log('passthru, leuser found: ', res);
              
              
            }, err => {
              console.log('passthru, user not found: ', err);
              // insert user into database
              let leUser = new LeUser;
              leUser.email = this.userProfile['email'];
              leUser.name = this.userProfile['nickname'];
              leUser.auth0Id = this.userProfile['user_id'];
              this._leUser.upsert(leUser)
                .subscribe(res => {
                  console.log('passthru, leuser created: ', res);
                }, err => console.log(err));
            });
        });
      });
    } else {
      console.log('passthru: ', res.code, this.userProfile);
      this.getUserData(this.userProfile);
    }

  }

  login() {
    // Send the user back to the dashboard after login
    this._router.navigateByUrl('/');
    this.lock.show();
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('app_le_user');
    localStorage.removeItem('id_token');
    this.userProfile = undefined;

    // Send the user back to the dashboard after logout
    this._router.navigateByUrl('/home');
  }

  loggedIn() {
    // this method should be examined, it is called for all routes, is this ok? fix
    return tokenNotExpired();
  }

  private slLogin() {
    this._api.login({
      "username": this.userProfile['name'],
      "password": this.userProfile['user_id']
    }).subscribe(res => { console.log('passthru ok'); this.passthru(res) }, res => { console.log('passthru failed'); this.passthru(res) });
  }

  private getUserData(profile) {

    if (profile) {

      // find user profile data from database
      this._leUser.find({ where: { auth0Id: profile.user_id } })
        .subscribe(res => {
          console.log('getUserData, leuser found: ', res);
          let r = <LeUser>res[0];
          
          
          if (r) {
            r.ldate = moment();

            // save user app data 
            localStorage.setItem('app_le_user', JSON.stringify(r));

            // update ldate
            this._leUser.upsert(r)
              .subscribe(res => { console.log('getUserData, leuser updated: ', res) }, err => console.log(err));
          }

        },
        err => console.log(err));
    }
  }
}