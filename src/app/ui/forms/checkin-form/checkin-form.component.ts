import { VEvent } from './../../../shared/sdk/models/VEvent';
import { EPerson } from './../../../shared/sdk/models/EPerson';
import { EPersonApi } from './../../../shared/sdk/services/custom/EPerson';
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
  private series;

  private selActivity;
  private selEvent;
  private selSerie;
  private selPerson;

  paginatorInitPage = 1;
  paginatorPageSize = 10;
  paginatorCount = 0;
  paginatorECount = 0;
  paginatorACount = 0;
  paginatorSCount = 0;

  checkinOk = false;
  i: number;

  constructor(
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _actApi: VActivityApi,
    private _eventApi: VEventApi,
    private _persApi: VMemberApi,
    private _api: EPersonApi) {
    super('checkin');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

    this.findActivity('', 1);
    this.findPerson('', 1);
    this.selActivity = { 'id': '0' };
    this.findEvent(1);


  }

  selectActivity(obj) {
    this.selActivity = obj;
    this.selEvent = {};
    this.eventss = [];
    this.selSerie = {};
    this.series = [];
    this.checkinOk = false;
    this.findEvent(1);
  }

  selectEvent(obj) {
    this.selEvent = obj;
    this.checkinOk = false;
    this.selSerie = {};
    this.series = [];
    this.findSeries(1);
  }

  selectPerson(obj) {
    this.selPerson = obj;
    this.selEvent = {};
    this.selActivity = {};
    this.eventss = [];
    this.selSerie = {};
    this.series = [];
    this.checkinOk = false;
  }

  selectSerie(obj) {
    this.selSerie = obj;
    this.series = [];
    this.checkinOk = false;
  }


  findActivity(value: string, page: number) {
    value = '%' + value + '%';
    this._actApi.find({
      where: { name: { like: value }, isacc : 1 }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
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
      where: { activityId: this.selActivity.id, meventId: null }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.eventss = res;
        this.fixListLength(this.paginatorPageSize, this.eventss);

        this._eventApi.count({ activityId: this.selActivity.id, meventId: 'null' })
          .subscribe(res2 => this.paginatorECount = res2.count);
      });
  }

  findSeries(page: number) {
    this._eventApi.find({
      where: { activityId: this.selActivity.id, meventId: this.selEvent.id }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.series = res;
        this.fixListLength(this.paginatorPageSize, this.series);

        this._eventApi.count({ activityId: this.selActivity.id, meventId: this.selEvent.id })
          .subscribe(res2 => this.paginatorSCount = res2.count);
      });
  }

  pageAChange(value, page) {
    //this.findPerson(value, page);
    this.findActivity(value, page);
  }

  pagePChange(value, page) {
    //this.findPerson(value, page);
    this.findPerson(value, page);
  }

  pageEChange(value) {
    this.findEvent(value);
  }

  pageSChange(value) {
    this.findSeries(value);
  }

  // add person to selected activity and its events and series
  checkinPersonAll() {
    this.i = 0;
    this._eventApi.find({ where: { activityId: this.selActivity.id } })
      .subscribe(res => {
        for (let r of res)
          this._api.upsert(
            new EPerson(
              { personId: this.selPerson.id, eventId: (<VEvent>r).id, id: 0 }
            ))
            .subscribe(null, res => console.log(res), () => { this.i++ });
      }, res => console.log(res), () => { this.checkinOk = true });

  }


  // add person to selected event and its series
  checkinPersonOne() {
    this.i = 0;
    this._eventApi.find({ where: { or: [{ id: this.selEvent.id }, { meventId: this.selEvent.id }] } })
      .subscribe(res => {
        for (let r of res)
          this._api.upsert(
            new EPerson(
              { personId: this.selPerson.id, eventId: (<VEvent>r).id, id: 0 }
            ))
            .subscribe(null, res => console.log(res), () => { this.i++ });
      }, res => console.log(res), () => { this.checkinOk = true });
  }

  // add person to selected event in serie
  checkinPersonOneSerie() {
    this.i = 0;
    this._eventApi.find({ where: { id: this.selSerie.id }})
      .subscribe(res => {
        for (let r of res)
          this._api.upsert(
            new EPerson(
              { personId: this.selPerson.id, eventId: (<VEvent>r).id, id: 0 }
            ))
            .subscribe(null, res => console.log(res), () => { this.i++ });
      }, res => console.log(res), () => { this.checkinOk = true });
  }
  
}
