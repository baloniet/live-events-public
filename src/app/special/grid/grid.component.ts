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
    private _actApi: VActivityApi
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
        for (let m of res) {
          this._eApi.find({ order: ["starttime"], where: { "activityId": this.actId, "personId": (<VAmember>m).personId } })
            .subscribe(res => {

              let evts = this.eids.slice();

              for (let e of res) {
                let index = evts.indexOf(e['id']);
                if (index > -1)
                  evts[index] = { ack: e['padate'], off: e['podate'], test: 1 };
              }
              this.members.push({ lastname: (<VAmember>m).lastname, firstname: (<VAmember>m).firstname, events: evts })

            }, this.errMethod);
        }
      }, this.errMethod);
  }

  print() {
    window.print();
  }

  back() {
    this._location.back();
  }
}
