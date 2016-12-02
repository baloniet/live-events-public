import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseForm.component';
import { VActivityApi, VEventApi, VMemberApi } from '../../../shared/sdk/services/index';

@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.css']
})
export class CheckinFormComponent extends BaseFormComponent implements OnInit {

  private activities;
  private eventss;
  private people;

  private selAct = 0;
  private selEvt = 0;
  private selPer = 0;

  paginatorInitPage = 1;
  paginatorPageSize = 10;
  paginatorCount = 0;
  paginatorECount = 0;
  paginatorACount = 0;

  constructor(
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _actApi: VActivityApi,
    private _eventApi: VEventApi,
    private _persApi: VMemberApi) {
    super('checkin');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

    this.findActivity('', 1);
    this.findPerson('', 1);
    this.findEvent(1);


  }

  selectActivity(id: number) {
    this.selAct = id;
    this.findEvent(1);
  }

  selectEvent(id: number) {
    this.selEvt = id;
  }

  selectPerson(id: number) {
    this.selPer = id;
  }

  findActivity(value: string, page: number) {
    value = '%' + value + '%';
    this._actApi.find({
      where: { name: { like: value } }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: "name"
    })
      .subscribe(res => {
        this.activities = res;

        this.fixListLength(this.paginatorPageSize, this.activities);

        this._actApi.count({ name: { like: value } })
          .subscribe(res2 => this.paginatorACount = res2.count);
      });
  }

  findPerson(value: string, page: number) {
    value = '%' + value + '%';
    this._persApi.find({
      where: { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: "lastname"
    }).subscribe(res => {
      this.people = res;
      this.fixListLength(this.paginatorPageSize, this.people);

      this._persApi.count({ or: [{ firstname: { like: value } }, { lastname: { like: value } }] })
        .subscribe(res2 => this.paginatorCount = res2.count);
    });
  }


  findEvent(page: number) {
    this._eventApi.find({
      where: { activityId: this.selAct, meventId: null }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: [ "starttime", name ]
    })
      .subscribe(res => {
        this.eventss = res;
        this.fixListLength(this.paginatorPageSize, this.eventss);

        this._eventApi.count({ activityId: this.selAct, meventId: 'null' })
          .subscribe(res2 => this.paginatorECount = res2.count);
      });
  }


  pageAChange(value, page) {
    //this.findPerson(value, page);
    this.findActivity(value, page);
  }

  pageEChange(value) {
    this.findEvent(value);
  }

}
