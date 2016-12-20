import { Location } from '@angular/common';
import { VActivityApi } from './../shared/sdk/services/custom/VActivity';
import { VEventApi } from './../shared/sdk/services/custom/VEvent';
import { LabelService } from '../services/label.service';
import { ActivatedRoute } from '@angular/router';
import { VMeventEApi } from '../shared/sdk/services/custom/VMeventE';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../ui/forms/baseForm.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent extends BaseFormComponent implements OnInit {

  events;

  event;

  act;

  constructor(
    private _route: ActivatedRoute,
    private _labelService: LabelService,
    private _ePers: VMeventEApi,
    private _evt: VEventApi,
    private _act: VActivityApi,
    private _location: Location) {
    super('print', 'view');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  selectData(param) {
    if (param.type == 'event') {
      this.selectEventData(param);
    }
  }

  private selectEventData(p) {
    let condition;

    if (this.getParam('filter') == "1")
     condition = {id: p.id, adate: {neq: null}};
    else if (this.getParam('filter') == "2")
     condition = {id: p.id, odate: {neq: null}}; 
    else if (this.getParam('filter') == "3")
     condition = {id: p.id}; 
     
    this._ePers.find({ where: condition })
      .subscribe(res => this.events = res);

    this._evt.find({ where: { id: p.id } })
      .subscribe(res => this.event = res[0]);

    this._act.find({ where: { id: p.activityid } })
      .subscribe(res => this.act = res[0]);

  }

  print() {
    window.print();
  }

  back() {
    this._location.back();
  }
}
