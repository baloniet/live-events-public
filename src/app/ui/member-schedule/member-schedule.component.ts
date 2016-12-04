import { VMemberApi } from './../../shared/sdk/services/custom/VMember';
import { Router } from '@angular/router';
import { LabelService } from './../../services/label.service';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../forms/baseForm.component';

@Component({
  selector: 'app-member-schedule',
  templateUrl: './member-schedule.component.html',
  providers: [ScheduleService, LabelService]
})
export class MemberScheduleComponent extends BaseFormComponent implements OnInit {

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
    private _personApi: VMemberApi,
    private _router: Router
  ) {
    super('person','member schedule');
  }

  ngOnInit() {

    this.prepareLabels(this._labelService);

    this.defaultView = ['listMonth'];

    this.header = {
      left: 'prev, next, today myCustomButton',
      center: 'title',
      right: 'agendaWeek,listMonth,listWeek,listDay'
    };

    this._personApi.find({ where: { id: { gt: 0 } }, order: "lastname" })
      .subscribe(res => this.choices = res, err => console.log(err));


  }

  viewRender(e: any) {
    this.start = e.view.start.format();
    this.end = e.view.end.format();
    this.events = this._eventService.getEventsOfMembers(this.selectedChoices, e.view.start.format(), e.view.end.format());
  }

  show(id) {
    //this.events = this._eventService.getEventsOfRooms([id],this.start, this.end);
  }

  toggle(id) {
    var index = this.selectedChoices.indexOf(id);
    if (index === -1) this.selectedChoices.push(id);
    else this.selectedChoices.splice(index, 1);
    this.events = this._eventService.getEventsOfMembers(this.selectedChoices, this.start, this.end);
  }

  exists(id) {
    return this.selectedChoices.indexOf(id) > -1;
  }

      // open event view on click
    handleEventClick(e: any) {

        this._router.navigate(['/view/event', { 'type': 'event', 'id': e.calEvent.id }]);

    }

}

