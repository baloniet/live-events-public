import { LabelService } from './../../services/label.service';
import { VPlocationApi } from './../../shared/sdk/services/custom/VPlocation';
import { Event } from './../../shared/sdk/models/Event';
import { ScheduleService } from '../../services/schedule.service';
import { Schedule } from './schedule.module';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { BaseFormComponent } from '../forms/baseForm.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.html',
    providers: [ScheduleService]
})
export class ScheduleProxy extends BaseFormComponent implements OnInit {

    @Input() events: any;

    header: any;

    event: MyEvent;

    dialogVisible: boolean = false;

    idGen: number = 100;

    bussinesHours: any;

    defaultView;

    start;
    end;

    // rooms chekboxes
    choices;
    selectedChoices = [];

    constructor(
        private _eventService: ScheduleService,
        private _cd: ChangeDetectorRef,
        private _route: ActivatedRoute,
        private _router: Router,
        private _locApi: VPlocationApi,
        private _labelService: LabelService
    ) {
        super('event', 'schedule');
    }

    ngOnInit() {

        this.prepareLabels(this._labelService);

        this._route.params
            .subscribe(
            res =>
                (
                    this.defaultView = res['view']
                )
            );

        this.header = {
            left: 'prev, next, today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'//,agendaWeek,agendaDay,listYear,listMonth,listWeek,listDay'		
        };

        this.getProvidedRouteParams(this._route);

    }

    selectData(param) {
        this._locApi.find({ where: { personId: this.getUserAppId() }, order: "name" })
            .subscribe(res => this.choices = res, err => console.log(err));
    }

    toggle(id) {
        var index = this.selectedChoices.indexOf(id);
        if (index === -1) this.selectedChoices.push(id);
        else this.selectedChoices.splice(index, 1);
        this.events = this._eventService.getEvents(this.start, this.end, this.selectedChoices);
    }

    exists(id) {
        return this.selectedChoices.indexOf(id) > -1;
    }



    handleDayClick(event: any) {



        this.event = new MyEvent();
        this.event.start = event.date.format();



        this.dialogVisible = true;

        // TODO tu bi lahko bil if da se ne bi spodnje zgodilo če je že agendaDay
        event.view.calendar.gotoDate(event.date);
        //   event.view.calendar.changeView('agendaDay');


        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this._cd.detectChanges();

        //     this.openModal(this.event);
        console.log('day clicked' + JSON.stringify(this.event));

    }

    // open event view on click
    handleEventClick(e: any) {

        /*this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;


        console.log('event clicked' + JSON.stringify(this.event));*/
        this._router.navigate(['/view/event', { 'type': 'event', 'id': e.calEvent.id }]);

    }

    handleEventDrop(e: any) {
        this._eventService.updateEvent(e.event);
    }

    handleEventResize(e: any) {
        this._eventService.updateEvent(e.event);
    }

    viewRender(e: any) {
        // console.log(e.view.start.format(),e.view.end.format(),e.view.intervalStart.format(),e.view.intervalEnd.format());
        this.start = e.view.start.format();
        this.end = e.view.end.format();
        this.events = this._eventService.getEvents(e.view.start.format(), e.view.end.format());
    }

    saveEvent() {
        //update
        if (this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
    event: Event;
}