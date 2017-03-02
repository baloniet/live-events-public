import { EPerson } from './../../shared/sdk/models/EPerson';
import { EPersonApi } from './../../shared/sdk/services/custom/EPerson';
import { Location } from '@angular/common';
import { VActivityApi } from './../../shared/sdk/services/custom/VActivity';
import { VMeventApi } from './../../shared/sdk/services/custom/VMevent';
import { VAmember } from './../../shared/sdk/models/VAmember';
import { VMeinApi } from './../../shared/sdk/services/custom/VMein';
import { VAmemberApi } from './../../shared/sdk/services/custom/VAmember';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../../services/label.service';
import { EventApi } from './../../shared/sdk/services/custom/Event';
import { BaseFormComponent } from '../../ui/forms/baseForm.component';
import { Component, OnInit } from '@angular/core';

var moment = require('./../../../assets/js/moment.min.js');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent extends BaseFormComponent implements OnInit {

  private actId;
  private events;
  private eids;
  private members;
  private act;

  constructor(
    private _location: Location,
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _eventApi: EventApi,
    private _memberApi: VAmemberApi,
    private _eApi: VMeventApi,
    private _actApi: VActivityApi,
    private _epersApi: EPersonApi
  ) {
    super('event-view', 'grid')
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  selectData(param) {
    if (param) {
      this.actId = param.id;

      this._actApi.find({ where: { id: this.actId } })
        .subscribe(res => this.act = res[0], err => this.errMethod);

      this._eventApi.find({ order: ["starttime"], where: { "activityId": this.actId } })
        .subscribe(res => {
          this.events = res;
          this.eids = [];
          for (let r of res)
            this.eids.push(r['id']);
          this.prepareMembers()
        }, this.errMethod);
    }
  }

  prepareMembers() {
    this._memberApi.find({ order: ["lastname", "firstname"], where: { "id": this.actId } })
      .subscribe(res => {

        this.members = [];
        for (let m of res)
          this.members.push(m['personId']);

        for (let m of res) {
          let personId = (<VAmember>m).personId;
          this._eApi.find({ order: ["starttime"], where: { "activityId": this.actId, "personId": personId } })
            .subscribe(res => {

              let evts = this.eids.slice();

              for (let e of res) {
                let index = evts.indexOf(e['id']);
                if (index > -1)
                  evts[index] = { ack: e['padate'], off: e['podate'], test: 1, personId: personId, eventId: e['id'], epersonId: e['epersonId'] };
              }
              this.members[this.members.indexOf(personId)] = { personId: personId, lastname: (<VAmember>m).lastname, firstname: (<VAmember>m).firstname, mnum: (<VAmember>m).mnum, events: evts };

            }, this.errMethod);
        }
      }, this.errMethod);
  }

  // toggle acknowledge and offcheck for person and specified event
  private toggle(d, type: string, m?) {
    if (type == 'off') {
      if (d.off)
        d.off = null;
      else d.off = moment().format();
    } else if (type == 'ack') {
      if (d.ack)
        d.ack = null;
      else d.ack = moment().format();
    } else if (type = 'add') {
      let id = d;
      d = { test: 1, ack: moment().format(), off: null, epersonId: 0, personId: m.personId, eventId: id };
    }


    let ep = new EPerson;
    ep.personId = d.personId;
    ep.eventId = d.eventId;
    ep.adate = d.ack;
    ep.odate = d.off;
    ep.id = d.epersonId;
    this._epersApi.upsert(ep)
      .subscribe(null, err => console.log(err), () => {
        if (type == 'add')
          this.prepareMembers();
      });

  }

  print() {
    window.print();
  }

  back() {
    this._location.back();
  }
}
