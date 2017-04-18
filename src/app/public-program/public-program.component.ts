import { PartnerApi } from './../shared/sdk/services/custom/Partner';
import { Location } from '@angular/common';
import { Event } from './../shared/sdk/models/Event';
import { EventApi } from './../shared/sdk/services/custom/Event';
import { Activity } from './../shared/sdk/models/Activity';
import { ActivityApi } from './../shared/sdk/services/custom/Activity';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../services/label.service';
import { VFeventApi } from './../shared/sdk/services/custom/VFevent';
import { BaseFormComponent } from '../ui/forms/baseForm.component';
import { Component, OnInit } from '@angular/core';
import { VPlocationApi } from './../shared/sdk/services/custom/VPlocation';
import { VLocationApi } from './../shared/sdk/services/custom/VLocation';
let moment = require('../../assets/js/moment.min.js');


@Component({
  selector: 'app-public-program',
  templateUrl: './public-program.component.html',
  styleUrls: ['./public-program.component.css']
})
export class PublicProgramComponent extends BaseFormComponent implements OnInit {

  private data;
  colors = [];
  outcolors = ['link text-primary', 'link text-success', 'link text-info', 'link text-warning'];
  basecolors = ['primary', 'success', 'info', 'warning'];
  partnerSwitch = [];
  locationSwitch = [];
  partners = [];
  partnersOriginIds = [];
  partnersIds = [];
  locations = [];

  month;
  off = 0;

  constructor(
    private _location: Location,
    private _api: VFeventApi,
    private _labelService: LabelService,
    private _vPloc: VPlocationApi,
    private _vloc: VLocationApi,
    private _route: ActivatedRoute,
    private _eventApi: EventApi,
    private _actApi: ActivityApi,
    private _partApi: PartnerApi) {
    super('event', 'program');
  }

  ngOnInit() {
    // this is extremely ugly, but moment somehow does not change locale, it is connected with fullcalendar TODO fix this!
    moment.updateLocale('en', {
      weekdays: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'],
      months: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParamsLocations(this._route, this._vPloc);

  }

  prepareButtons() {
    let i = 0;
    for (let s of this.partnerSwitch) {
      if (s === true) {
        this.colors[i] = this.basecolors[i];
        this.partnersIds.splice(i, 1, this.partners[i].id);
      } else {
        this.colors[i] = this.outcolors[i];
        this.partnersIds.splice(i, 1);
      }
      i++;
    }
    this.prepareLocations();
  }

  prepareLocations() {
    this._vloc.find({ order: ['pname', 'name'], where: { partnerId: { inq: this.partnersIds } } })
      .subscribe(res => {
        this.locations = [];
        this.locationSwitch = res.map(r => false);
        for (let r of res) {
          let name = r['name'];
          this.locations.push({ id: r['id'], name: name.substr(name.indexOf(': ') + 2), colorId: this.partnersOriginIds.indexOf(r['partnerId']) });
        }
      }
      , this.errMethod);
  }

  // call service to find model in db
  selectData(param) {

    this._partApi.find({ order: 'name', where: { ispublic: 1 } })
      .subscribe(res => {
        this.partners = res;
        this.partnerSwitch = res.map(r => false);
        this.partnersOriginIds = res.map(r => r['id']);
        this.prepareButtons();
      }, this.errMethod);

    let start;
    let end;
    let date;
    date = moment().startOf('month');
    start = date.clone().add(this.off, 'month').format();
    end = date.add(this.off + 1, 'month').format();
    this.month = moment(start).format('MMMM YYYY');

    this._api.find({
      order: 'starttime',
      where: { locationId: { inq: this.locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } }
    })
      .subscribe(res => {
        this.data = res;
        let temp;
        for (let d of this.data) {
          let t = moment(d.starttime).format('dddd');
          if (t !== temp) {
            d.day = t;
            temp = t;
          }
          d.wday = moment(d.starttime).day();
        }
      });
  }

  getEvents() {
    let start;
    let end;
    let date;
    date = moment().startOf('month');
    start = date.clone().add(this.off, 'month').format();
    end = date.add(this.off + 1, 'month').format();
    this.month = moment(start).format('MMMM YYYY');

    this._api.find({
      order: 'starttime',
      where: { locationId: { inq: this.locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } }
    })
      .subscribe(res => {
        this.data = res;
        
        let temp;
        for (let d of this.data) {
          let t = moment(d.starttime).format('dddd');
          if (t !== temp) {
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
          .subscribe(null, this.errMethod);
      }, this.errMethod);
  }

  setOff(d) {
    this._eventApi.findById(d.id)
      .subscribe(res => {
        let model = <Event>res;
        model.isoff = 1;
        d.isoff = 1;
        model.odate = moment();
        this._eventApi.upsert(model)
          .subscribe(null, this.errMethod);
      }, this.errMethod);
  }

  togglePublish(d) {
    if (d.publish) {
      d.publish = null;
    } else d.publish = 1;

    this._actApi.findById(d.activityId)
      .subscribe(res => {
        let model = <Activity>res;
        model.publish = d.publish;
        this._actApi.upsert(model)
          .subscribe(null, this.errMethod);
      }, this.errMethod);

  }

  togglePartner(i: number) {
    this.partnerSwitch[i] = !this.partnerSwitch[i];
    this.prepareButtons();
  }

  locationIds = [];
  toggleLocation(i: number, colorId: number) {
    this.locationSwitch[i] = !this.locationSwitch[i];
    let j = 0;
    for (let s of this.locationSwitch) {
      if (s === true) {
        this.locationIds.splice(j, 1, this.locations[j].id);
      } else {
        this.locationIds.splice(j, 1);
      }
      j++;
    }
    this.getEvents();
  }

  print() {
    window.print();
  }

  back() {
    this._location.back();
  }

}
