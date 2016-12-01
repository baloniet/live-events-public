import { LabelService } from './../../services/label.service';
import { RoomApi } from './../../shared/sdk/services/custom/Room';
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
    private _roomApi: RoomApi
  ) {
    super('schedule');
  }

  ngOnInit() {

    sessionStorage.setItem('guiErrorTracker', ' room-scheduler');

    this.prepareLabels(this._labelService);

    this.defaultView = ['listMonth'];

    this.header = {
      left: 'prev, next, today myCustomButton',
      center: 'title',
      right: 'agendaWeek,listMonth,listWeek,listDay'
    };

    this._roomApi.find({ where: { id: { gt: 0 } }, order: "name" })
      .subscribe(res => this.choices = res, err => console.log(err));

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

}