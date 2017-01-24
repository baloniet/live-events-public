import { VRoomApi } from './../../shared/sdk/services/custom/VRoom';
import { VPlocationApi } from './../../shared/sdk/services/custom/VPlocation';
import { Router, ActivatedRoute } from '@angular/router';
import { LabelService } from './../../services/label.service';
import { ScheduleService } from '../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../forms/baseForm.component';

@Component({
  selector: 'app-room-schedule',
  templateUrl: './room-schedule.component.html',
  providers: [ScheduleService]
})
export class RoomScheduleComponent extends BaseFormComponent implements OnInit {

  header: any;

  events: any;

  defaultView;

  choices;

  // rooms chekboxes
  selectedChoices = [];

  start;
  end;

  constructor(
    private _labelService: LabelService,
    private _eventService: ScheduleService,
    private _roomApi: VRoomApi,
    private _route: ActivatedRoute,
    private _locApi: VPlocationApi,
    private _router: Router
  ) {
    super('room', 'schedule');
  }

  ngOnInit() {

    this.prepareLabels(this._labelService);

    this.defaultView = ['listMonth'];

    this.header = {
      left: 'prev, next, today myCustomButton',
      center: 'title',
      right: 'agendaWeek,listMonth,listWeek,listDay'
    };

    this.getProvidedRouteParamsLocations(this._route, this._locApi);
  }

  selectData(param) {
    if (param.id) {
      this._roomApi.find({ where: { id: { gt: 0 }, locationId: { inq: this.getUserLocationsIds() } }, order: "name" })
        .subscribe(res => {
          this.choices = res;
          this.toggle(parseInt(param.id));
        }, err => console.log(err));
    } else this._roomApi.find({ where: { id: { gt: 0 }, locationId: { inq: this.getUserLocationsIds() } }, order: "name" })
      .subscribe(res => {
        this.choices = res;
        for (let r of res)
          this.selectedChoices.push(r['id']);
        this.events = this._eventService.getEventsOfRooms(this.selectedChoices, this.start, this.end);
      }, err => console.log(err));
  }

  viewRender(e: any) {
    // console.log(e.view.start.format(),e.view.end.format(),e.view.intervalStart.format(),e.view.intervalEnd.format());
    this.start = e.view.start.format();
    this.end = e.view.end.format();
    this.events = this._eventService.getEventsOfRooms(this.selectedChoices, e.view.start.format(), e.view.end.format());
  }

  show(id) {
    //this.events = this._eventService.getEventsOfRooms([id],this.start, this.end);
  }

  toggle(id) {
    var index = this.selectedChoices.indexOf(id);
    if (index === -1) this.selectedChoices.push(id);
    else this.selectedChoices.splice(index, 1);
    this.events = this._eventService.getEventsOfRooms(this.selectedChoices, this.start, this.end);
  }

  exists(id) {
    return this.selectedChoices.indexOf(id) > -1;
  }

  // open event view on click
  handleEventClick(e: any) {

    this._router.navigate(['/view/event', { 'type': 'event', 'id': e.calEvent.id }]);

  }


}