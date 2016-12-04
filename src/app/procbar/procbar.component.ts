import { VStatPerApi } from './../shared/sdk/services/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procbar',
  templateUrl: './procbar.component.html',
  styleUrls: ['./procbar.component.css']
})
export class ProcbarComponent implements OnInit {

  constructor(private _api: VStatPerApi) {

  }

  private stat: {};

  ngOnInit() {
    this._api.find()
      .subscribe(res => this.stat = res[0]);
  }

}
