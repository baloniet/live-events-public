import { Errors } from './../../shared/sdk/models/Errors';
import { ErrorsApi } from './../../shared/sdk/services/custom/Errors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error-tracker',
  templateUrl: './error-tracker.component.html'
})
export class ErrorTrackerComponent implements OnInit {

  constructor(private _api: ErrorsApi) { }

  ngOnInit() {
    localStorage.getItem('guiErrorTracker');
  }

  sendMsg(value) {
    if (value) {
      let error = new Errors();
      error.companyId = 1; //this should be changed TODO
      error.gui = sessionStorage.getItem('guiErrorTracker');
      error.msg = value;
      error.id = 0;

      this._api.upsert(error)
        .subscribe(null, error => console.log(error));
    }
  }
}
