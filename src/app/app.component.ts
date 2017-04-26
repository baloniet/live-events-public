import { environment } from './../environments/environment';
import { API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk/lb.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor() {

    // global gui variable for error ErrorTrackerComponent
    sessionStorage.setItem('guiErrorTracker', 'app');

    // configure loopback
    LoopBackConfig.setBaseURL(environment.BASE_API_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {

  }


}
