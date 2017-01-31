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

  paginatorInitPage = 1;
  paginatorPageSize = 20;
  paginatorCount = 0;
  condition;

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

    if (this.getParam('filter') == "1")
      this.condition = { id: p.id, adate: { neq: null } };
    else if (this.getParam('filter') == "2")
      this.condition = { id: p.id, odate: { neq: null } };
    else if (this.getParam('filter') == "3")
      this.condition = { id: p.id };

    this.prepareEvents(1);

    this._evt.find({ where: { id: p.id } })
      .subscribe(res => this.event = res[0]);

    this._act.find({ where: { id: p.activityid } })
      .subscribe(res => this.act = res[0]);

  }

  prepareEvents(page) {
    this._ePers.find({ where: this.condition, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
      .subscribe(res => {
        this.events = res;
        this.fixListLength(this.paginatorPageSize, res);
        this._ePers.count(this.condition).subscribe(res => this.paginatorCount = res.count);
      }, this.errMethod);
  }

  print() {
    window.print();
  }

  back() {
    this._location.back();
  }
}
