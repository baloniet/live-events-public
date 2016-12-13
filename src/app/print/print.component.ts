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

  constructor(
    private _route: ActivatedRoute,
    private _labelService: LabelService,
    private _ePers: VMeventEApi) {
    super('print', 'view');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  selectData(param){
        if (param.type == 'event') {
          this.selectEventData(param.id);
        }
  }

  private selectEventData(id) {
    this._ePers.find({ where: { id: id } })
      .subscribe(res => this.events = res);
  }

  print() {
    window.print();
  }

}
