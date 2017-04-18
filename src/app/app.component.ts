import { Location } from '@angular/common';
import { LeUserApi } from './shared/sdk/services/custom/LeUser';
import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk/lb.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _api: LeUserApi,
    private url: Location // FIXME: this should be removed when routing will be ok
  ) {

    // global gui variable for error ErrorTrackerComponent
    sessionStorage.setItem('guiErrorTracker', 'app');

    // configure loopback
    LoopBackConfig.setBaseURL(environment.BASE_API_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {

    if (this.url.path().indexOf('/public-program') < 0) {
      if (!this._auth.loggedIn())
        this._auth.login();
    } else {
      localStorage.removeItem('profile');
      localStorage.removeItem('app_le_user');
      localStorage.removeItem('id_token');
    }

  }


}
