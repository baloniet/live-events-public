import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseForm.component';
import { VActivityApi, VEventApi, PersonApi } from '../../../shared/sdk/services/index';
import { Person } from '../../../shared/sdk/models/index';

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.css']
})
export class CheckinFormComponent extends BaseFormComponent implements OnInit {

  private activities;
  private events;
  private people;

  private selAct;
  private selEvt;

  paginatorInitPage = 1;
  paginatorPageSize = 10;
  paginatorCount = 0;

  constructor(
    private _labelService: LabelService,
    private _actApi: VActivityApi,
    private _eventApi: VEventApi,
    private _persApi: PersonApi) {
    super('checkin');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this._actApi.find()
      .subscribe(res => this.activities = res);

  }

  selectActivity(id: number) {
    this.selAct = id;
    this._eventApi.find({ "where": { "activityId": id } })
      .subscribe(res => this.events = res);
  }

  selectEvent(id: number) {
    this.selEvt = id;
  }

  findPerson(value: string, page: number) {

    value = '%' + value + '%';
    this._persApi.find({ where: { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
      .subscribe(res => {
        this.people = res;
        this.fixListLength(this.paginatorPageSize,this.people);
            
        this._persApi.count({ or: [{ firstname: { like: value } }, { lastname: { like: value } }] })
          .subscribe(res => this.paginatorCount = res.count);
      });
  }

  pageChange(value, page) {
    this.findPerson(value, page);
  }

}
