import { VMevent } from './../../../shared/sdk/models/VMevent';
import { EPerson } from './../../../shared/sdk/models/EPerson';
import { EPersonApi } from './../../../shared/sdk/services/custom/EPerson';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseForm.component';
import { VAmemberApi, VMeventApi, VMemberApi, VMeinApi, VPlocationApi, VMeventEApi } from '../../../shared/sdk/services/index';

var moment = require('./../../../../assets/js/moment.min.js');

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html'
})
export class CheckoutFormComponent extends BaseFormComponent implements OnInit {

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
    private _actApi: VAmemberApi,
    private _eventApi: VMeventApi,
    private _eApi: VMeinApi,
    private _persApi: VMeventEApi,
    private _vplocApi: VPlocationApi,
    private _api: EPersonApi) {
    super('checkout');
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParamsLocations(this._route, this._vplocApi);
  }

  selectData(){
    this.findPerson('', 1);
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
    this.findActivity('', 1);
  }

  selectSerie(obj) {
    this.selSerie = obj;
    this.checkinOk = false;
  }


  findActivity(value: string, page: number) {
    value = '%' + value + '%';
    this._actApi.find({
      where: { name: { like: value }, isacc: 1, personId: this.selPerson.id }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: "name"
    })
      .subscribe(res => {
        this.activities = res;

        this.fixListLength(this.paginatorPageSize, this.activities);

        this._actApi.count({ name: { like: value }, isacc: 1, personId: this.selPerson.id })
          .subscribe(res2 => this.paginatorACount = res2.count);
      });
  }

  findPerson(value: string, page: number) {
    console.log(this.getUserLocationsIds());
    value = '%' + value + '%';
    this._persApi.find({
      where: { and: [{ or: [{ firstname: { like: value } }, { lastname: { like: value } }] }, { locationId: { inq: this.getUserLocationsIds() } }] },
      limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: "lastname"
    }).subscribe(res => {
      this.people = res;
      this.fixListLength(this.paginatorPageSize, this.people);

      this._persApi.count({ or: [{ firstname: { like: value } }, { lastname: { like: value } }] })
        .subscribe(res2 => this.paginatorCount = res2.count);
    });
  }


  findEvent(page: number) {
    this._eApi.find({
      where: { activityId: this.selActivity.id, personId: this.selPerson.id }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.eventss = res;
        this.fixListLength(this.paginatorPageSize, this.eventss);

        this._eApi.count({ activityId: this.selActivity.id, personId: this.selPerson.id })
          .subscribe(res2 => this.paginatorECount = res2.count);
      });
  }

  findSeries(page: number) {
    this._eventApi.find({
      where: {
        and: [{ activityId: this.selActivity.id }, { personId: this.selPerson.id }, { podate: null }, {
          or: [{ meventId: this.selEvent.id }, { id: this.selEvent.id }]
        }]
      }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.series = res;
        this.fixListLength(this.paginatorPageSize, this.series);

        this._eventApi.count({
          and: [{ activityId: this.selActivity.id }, { personId: this.selPerson.id }, { podate: 'null' }, {
            or: [{ meventId: this.selEvent.id }, { id: this.selEvent.id }]
          }]
        })
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
    this._eventApi.find({ where: { activityId: this.selActivity.id, personId: this.selPerson.id } })
      .subscribe(res => {
        for (let r of res)
          this._api.upsert(
            new EPerson(
              { personId: this.selPerson.id, eventId: (<VMevent>r).id, id: (<VMevent>r).epersonId, odate: moment() }
            ))
            .subscribe(null, res => console.log(res), () => { this.i++ });
      }, res => console.log(res), () => { this.checkinOk = true });

  }


  // add person to selected event and its series
  checkinPersonOne() {
    this.i = 0;
    this._eventApi.find({
      where: {
        and: [
          { personId: this.selPerson.id },
          {
            or:
            [{ id: this.selEvent.id }, { meventId: this.selEvent.id }]
          }
        ]
      }
    })
      .subscribe(res => {
        for (let r of res)
          this._api.upsert(
            new EPerson(
              { personId: this.selPerson.id, eventId: (<VMevent>r).id, id: (<VMevent>r).epersonId, odate: moment() }
            ))
            .subscribe(null, res => console.log(res), () => { this.i++ });
      }, res => console.log(res), () => { this.checkinOk = true });
  }

  // add person to selected event in serie
  checkinPersonOneSerie() {
    this.i = 0;
    this.selSerie.podate = moment();
    this._api.upsert(
      new EPerson(
        { id: this.selSerie.epersonId, personId: this.selSerie.personId, eventId: this.selSerie.id, odate: moment() }
      ))
      .subscribe(null, res => console.log(res), () => { this.i++; this.checkinOk = true });
  }

}
