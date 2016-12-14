import { VActivityApi } from './../shared/sdk/services/custom/VActivity';
import { VEventApi } from './../shared/sdk/services/custom/VEvent';
import { LabelService } from '../services/label.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _router: Router,
    private _labelService: LabelService,
    private _ePers: VMeventEApi,
    private _evt: VEventApi,
    private _act: VActivityApi) {
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
    this._ePers.find({ where: { id: p.id } })
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
    this._router.navigate(['/view/event', { 'type': 'confirmation', 'id': 0 }]);
  }
}
