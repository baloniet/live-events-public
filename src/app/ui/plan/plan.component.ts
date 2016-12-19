import { Router } from '@angular/router';
import { ScheduleService } from './../../services/schedule.service';
import { RoomApi } from './../../shared/sdk/services/custom/Room';
import { Component, OnInit } from '@angular/core';
var moment = require('../../../assets/js/moment.min.js');

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [ScheduleService]
})
export class PlanComponent implements OnInit {

  rooms;
  dates = [];
  events;
  selectedChoices = [];

  constructor(
    private _roomApi: RoomApi,
    private _eventService: ScheduleService,
    private _router: Router
  ) { }

  ngOnInit() {
    let start;
    let end;

    let date = moment().startOf('week');
    start = date.clone().format();

    for (let i = 0; i < 7; i++)
      this.dates.push({ date: date.add(1, 'd').clone().format('DD.MM.YYYY'), day: date.format('dddd'), d: parseInt(date.format('DD')) });

    end = date.clone().format();

    this._roomApi.find({where: {onchart : 1}})
      .subscribe(res => {
        this.rooms = res;
        for (let r of this.rooms)
          this.selectedChoices.push(r.id);
        this.events = this._eventService.getEventsOfRooms(this.selectedChoices, start, end);
        //        this.prepareArray(this.events);
      });

  }

  private prepareArray(events) {
    for (let e of events) {

    }
  }

  findEvent(d, roomId): string {
    let s = '<table width="100%" height="100%">';

    for (let e of this.events) {
      if (e.event.roomId == roomId && (moment(e.event.starttime).date() == d)) {
        let inDate = moment(e.event.starttime);
        let outDate = moment(e.event.endtime);
        let off = '<tr class="small" align="center"><td width="50%" onclick="sd()"><b>' 
        + inDate.format('HH:mm') + '-' + outDate.format('HH:mm');
        s = s + off + '</b></td><td>' + e.event.name + '</td></tr>';
      }
    }
    return s + '</table>';
  }

  navigate(link){
    		this._router.navigate([link]);
  }
}
