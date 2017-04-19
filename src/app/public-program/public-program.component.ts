import { VLocation } from './../shared/sdk/models/VLocation';
import { VEventApi } from './../shared/sdk/services/custom/VEvent';
import { PartnerApi } from './../shared/sdk/services/custom/Partner';
import { ActivityApi } from './../shared/sdk/services/custom/Activity';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../services/label.service';
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

  partnerSwitch = [];
  locationSwitch = [];
  partners = [];
  partnersOriginIds = [];
  locations = [];
  basecolors = ['primary', 'success', 'info', 'warning'];
  outcolors = ['link text-primary', 'link text-success', 'link text-info', 'link text-warning'];
  colors = ['link text-primary', 'link text-success', 'link text-info', 'link text-warning'];
  providedPartnerId;

  month;
  off = 0;

  constructor(
    private _api: VEventApi,
    private _labelService: LabelService,
    private _vPloc: VPlocationApi,
    private _vloc: VLocationApi,
    private _route: ActivatedRoute,
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
    this.getProvidedRouteParams(this._route);

  }


  // call service to find model in db
  selectData(param) {

    this._partApi.find({ order: 'name', where: { ispublic: 1 } })
      .subscribe(res => {
        this.partners = res;
        this.partnerSwitch = res.map(r => false);
        this.partnersOriginIds = res.map(r => r['id']);
        if (param.id) {
          this.providedPartnerId = parseInt(param.id);
          this.togglePartner(this.partnersOriginIds.indexOf(this.providedPartnerId));
        }
        this._vloc.find({ order: ['pname', 'name'], where: { partnerId: { inq: this.partnersOriginIds } } })
          .subscribe(res2 => {
            this.locations = [];
            this.locationSwitch = res2.map(r => false);
            let i = 0;
            if (this.providedPartnerId) {
              for (let r of res2) {
                if (r['partnerId'] === this.providedPartnerId) {
                  this.locationSwitch[i] = true;
                }
                i++;
              }
            }

            for (let r of res2) {
              let o = <VLocation>r;
              this.locations.push({
                id: o.id, short: o.short, address: o.address, name: o.name.substr(o.name.indexOf(': ') + 2),
                colorId: this.partnersOriginIds.indexOf(o.partnerId)
              });
            }

            if (this.providedPartnerId) {
              this.getEvents();
              this.providedPartnerId = null;
            }
          }
          , this.errMethod);
      }, this.errMethod);
  }

  getLocation(id: number): string {
    let loc = this.fromIdO(this.locations, id);
    return loc.address;
  }

  getShort(id: number): string {
    let loc = this.fromIdO(this.locations, id);
    return loc.short;
  }

  getColor(id: number): string {
    let loc = this.fromIdO(this.locations, id);
    return this.colors[loc.colorId];
  }

  getColorId(id: number): string {
    let loc = this.fromIdO(this.locations, id);
    return loc.colorId;
  }

  getEvents() {
    let locationIds = [];
    let start;
    let end;
    let date;

    let i = 0;
    for (let l of this.locationSwitch) {
      if (l === true) {

        locationIds.push(this.locations[i].id);
      }
      i++;
    }

    date = moment().startOf('month');
    start = date.clone().add(this.off, 'month').format();
    end = date.add(this.off + 1, 'month').format();
    this.month = moment(start).format('MMMM YYYY');

    this._api.find({
      order: 'starttime',
      where: { locationId: { inq: locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } }
    })
      .subscribe(res => {
        this.data = res;

        let temp;
        for (let d of this.data) {
          d.name = this.lineBreaker(d.name, 100, true);
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
    this.getEvents();
  }

  previous() {
    this.off--;
    this.getEvents();
  }

  togglePartner(i: number) {
    this.partnerSwitch[i] = !this.partnerSwitch[i];
    if (this.partnerSwitch[i] === true) {
      this.colors[i] = this.basecolors[i];
    } else {
      this.colors[i] = this.outcolors[i];
      for (let l of this.locations) {
        if (l.colorId === i)
          this.locationSwitch[this.locations.indexOf(l)] = false;
      }
      this.getEvents();
    }
  }

  toggleLocation(i: number, colorId: number) {
    this.locationSwitch[i] = !this.locationSwitch[i];
    this.getEvents();
  }

}
