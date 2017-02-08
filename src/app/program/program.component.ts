import { Event } from './../shared/sdk/models/Event';
import { EventApi } from './../shared/sdk/services/custom/Event';
import { Activity } from './../shared/sdk/models/Activity';
import { ActivityApi } from './../shared/sdk/services/custom/Activity';
import { VFevent } from './../shared/sdk/models/VFevent';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../services/label.service';
import { VFeventApi } from './../shared/sdk/services/custom/VFevent';
import { BaseFormComponent } from '../ui/forms/baseForm.component';
import { Component, OnInit } from '@angular/core';
import { VPlocationApi } from './../shared/sdk/services/custom/VPlocation';
var moment = require('../../assets/js/moment.min.js');


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent extends BaseFormComponent implements OnInit {

  private data;

  month;
  off = 0;

  constructor(
    private _api: VFeventApi,
    private _labelService: LabelService,
    private _vPloc: VPlocationApi,
    private _route: ActivatedRoute,
    private _eventApi: EventApi,
    private _actApi: ActivityApi) {
    super('event');
  }

  ngOnInit() {
    // this is extremely ugly, but moment somehow does not change locale, it is connected with fullcalendar TODO fix this!
    moment.updateLocale('en', {
      weekdays: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
      months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"]
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParamsLocations(this._route, this._vPloc);

  }

  // call service to find model in db
  selectData(param) {
    let start;
    let end;
    let date;
    date = moment().startOf('month');
    start = date.clone().add(this.off, 'month').format();
    end = date.add(this.off + 1, 'month').format();
    this.month = moment(start).format('MMMM YYYY');

    this._api.find({ order: "starttime", where: { locationId: { inq: this.getUserLocationsIds() }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
      .subscribe(res => {
        this.data = res;
        let temp;
        for (let d of this.data) {
          let t = moment(d.starttime).format('dddd');
          if (t != temp) {
            d.day = t;
            temp = t;
          }
          d.wday = moment(d.starttime).day();
        }
      });
  }

  next() {
    this.off++;
    this.selectData(null);
  }

  previous() {
    this.off--;
    this.selectData(null);
  }

  setAcc(d) {
    this._eventApi.findById(d.id)
      .subscribe(res => {
        let model = <Event>res;
        model.isacc = 1;
        d.isacc = 1;
        model.adate = moment();
        this._eventApi.upsert(model)
          .subscribe(null, err => console.log(err));
      }, err => console.log(err));
  }

  setOff(d) {
    this._eventApi.findById(d.id)
      .subscribe(res => {
        let model = <Event>res;
        model.isoff = 1;
        d.isoff = 1;
        model.odate = moment();
        this._eventApi.upsert(model)
          .subscribe(null, err => console.log(err));
      }, err => console.log(err));
  }

  togglePublish(d) {
    if (d.publish)
      d.publish = null;
    else d.publish = 1;

    this._actApi.findById(d.activityId)
      .subscribe(res => {
        let model = <Activity>res;
        model.publish = d.publish;
        this._actApi.upsert(model)
          .subscribe(null, err => console.log(err));
      }, err => console.log(err));

  }

  print() {
    window.print();
  }

}