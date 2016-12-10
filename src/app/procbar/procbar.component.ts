import { AuthService } from './../services/auth.service';
import { VStatPerApi } from './../shared/sdk/services/index';
import { Component, OnInit } from '@angular/core';
var moment = require('../../assets/js/moment.min.js');

@Component({
  selector: 'app-procbar',
  templateUrl: './procbar.component.html',
  styleUrls: ['./procbar.component.css']
})
export class ProcbarComponent implements OnInit {

  constructor(
    private _api: VStatPerApi,
    private _auth: AuthService) { }

  private stat: {};

  dateNow;
  dateSeven;

  ngOnInit() {
    this.dateNow = moment().format('DD. MMM');
    this.dateSeven = moment().add(7, 'day').format('DD. MMM');
    this._api.find()
      .subscribe(res => this.stat = res[0]);
  }

}
