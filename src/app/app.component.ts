import { LeUserApi } from './shared/sdk/services/custom/LeUser';
import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk/lb.config';
import { ErrorTrackerComponent } from './ui/error-tracker/error-tracker.component';
import { Component, OnInit } from '@angular/core';

var moment = require('../assets/js/moment.min.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private _auth: AuthService, private _api: LeUserApi) {

    //global gui variable for error ErrorTrackerComponent
    sessionStorage.setItem('guiErrorTracker', 'app');

    //configure loopback
    LoopBackConfig.setBaseURL(environment.BASE_API_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {

    if (!this._auth.loggedIn())
      this._auth.login();

    // get profile if exist  
    let profile = JSON.parse(localStorage.getItem('profile'));

    // find user profile data from database
    this._api.find({ where: { auth0Id: profile.auth0Id } })
      .subscribe(res => {
        
        let r = res[0];
        
        // save user app data 
        localStorage.setItem('app_le_user', JSON.stringify(r));

        // update ldate
        this._api.updateAll({ where: { auth0Id: profile.auth0Id } }, { ldate: moment() })
          .subscribe(null, err => console.log(err));

      },
      err => console.log(err));
  }


}
