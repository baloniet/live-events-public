import { LeUser } from './shared/sdk/models/LeUser';
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

  }


}
