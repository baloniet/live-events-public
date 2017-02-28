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

  constructor(
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _eventApi: EventApi,
    private _memberApi: VAmemberApi
  ) {
    super('event', 'grid')
  }

  ngOnInit() {
    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  selectData(param) {
    if (param) {
      this.actId = param.id;
      
      this._eventApi.find({ order: ["starttime"], where: { "activityId": this.actId } })
        .subscribe(res => {this.events = res; this.prepareMembers()}, this.errMethod);
    }
  }

  prepareMembers(){
    this._memberApi.find({})
  }
}
