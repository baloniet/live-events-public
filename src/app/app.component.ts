import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk/lb.config';
import { ErrorTrackerComponent } from './ui/error-tracker/error-tracker.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private _auth: AuthService) {

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
