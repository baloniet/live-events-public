import { ActivatedRoute } from '@angular/router';
import { VPlocationApi } from './../shared/sdk/services/custom/VPlocation';
import { AuthService } from './../services/auth.service';
import { VStatPerApi } from './../shared/sdk/services/index';
import { Component, OnInit } from '@angular/core';
var moment = require('../../assets/js/moment.min.js');
import { BaseFormComponent } from '../ui/forms/baseForm.component';

@Component({
  selector: 'app-procbar',
  templateUrl: './procbar.component.html',
  styleUrls: ['./procbar.component.css']
})
export class ProcbarComponent extends BaseFormComponent implements OnInit {


  constructor(
    private _api: VStatPerApi,
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _vPLocApi: VPlocationApi) {
    super('procbar')
  }

  private stat: {};

  dateNow;
  dateSeven;

  ngOnInit() {
    this.getProvidedRouteParamsLocations(this._route, this._vPLocApi);
    this.dateNow = moment().format('DD. MMM');
    this.dateSeven = moment().add(7, 'day').format('DD. MMM');
    this._api.find()
      .subscribe(res => this.stat = res[0]);
  }

}
