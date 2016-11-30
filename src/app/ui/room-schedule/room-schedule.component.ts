import { ScheduleService } from '../../services/schedule.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-schedule',
  templateUrl: './room-schedule.component.html',
  styleUrls: ['./room-schedule.component.css'],
  providers: [ScheduleService]
})
export class RoomScheduleComponent implements OnInit {

  header: any;

  events: any;

  constructor(
    private _eventService: ScheduleService
  ) { }

  ngOnInit() {

    sessionStorage.setItem('guiErrorTracker', ' room-scheduler');

    this.header = {
      left: 'prev, next, today myCustomButton',
      center: 'title',
      right: 'listYear,listMonth,listWeek,listDay'
    };
  }

  viewRender(e: any) {
    // console.log(e.view.start.format(),e.view.end.format(),e.view.intervalStart.format(),e.view.intervalEnd.format());
    this.events = this._eventService.getEvents(e.view.start.format(), e.view.end.format());
  }

}
