import { PersonApi } from './../../shared/sdk/services/custom/Person';
import { RoomApi } from './../../shared/sdk/services/custom/Room';
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

  defaultView;

  rooms;

  people;

  constructor(
    private _eventService: ScheduleService,
    private _roomApi: RoomApi,
    private _personApi: PersonApi
  ) { }

  ngOnInit() {

    sessionStorage.setItem('guiErrorTracker', ' room-scheduler');

    this.defaultView = ['listMonth'];

    this.header = {
      left: 'prev, next, today myCustomButton',
      center: 'title',
      right: 'listMonth,listWeek,listDay'
    };

    this._roomApi.find({where : {id : {gt:0}}, order : "name"})
      .subscribe(res => this.rooms = res, err => console.log(err));

    this._personApi.find({where : { or : [{isteacher : 1},{isvolunteer:1}]}, order : "lastname"})
      .subscribe(res => this.people = res, err => console.log(err));      
  }
start;
end;
  viewRender(e: any) {
    // console.log(e.view.start.format(),e.view.end.format(),e.view.intervalStart.format(),e.view.intervalEnd.format());
this.start = e.view.start.format();
this.end = e.view.end.format();
    this.events = this._eventService.getEvents(e.view.start.format(), e.view.end.format());
  }

  show(id){
    //this.events = this._eventService.getEventsOfRooms([id],this.start, this.end);
  }

  // rooms chekboxes
  selectedRooms = [];
  selectedPeople = [];

  toggleR(id) {
    var index = this.selectedRooms.indexOf(id);
    if (index === -1) this.selectedRooms.push(id);
    else this.selectedRooms.splice(index, 1);
    this.events = this._eventService.getEventsOfRooms(this.selectedRooms,this.start, this.end);
  }

  toggleP(id) {
    var index = this.selectedPeople.indexOf(id);
    if (index === -1) this.selectedPeople.push(id);
    else this.selectedPeople.splice(index, 1);
    this.events = this._eventService.getEventsOfPeople(this.selectedPeople,this.start, this.end);
  }

  existsR(id) {
    return this.selectedRooms.indexOf(id) > -1;
  }

  existsP(id) {
    return this.selectedPeople.indexOf(id) > -1;
  }

}
