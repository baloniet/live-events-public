import { ScheduleService } from '../../services/schedule.service';
import { EventModalContent } from './eventModal.component';
import { Schedule } from './schedule.module';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'schedule',
    templateUrl: './schedule.html',
    providers: [ScheduleService]
})
export class ScheduleProxy implements OnInit {

    @Input() events: any;

    header: any;

    event: MyEvent;

    dialogVisible: boolean = false;

    idGen: number = 100;

    bussinesHours: any;

    defaultView;


    constructor(
        private _eventService: ScheduleService,
        private _cd: ChangeDetectorRef,
        private _route: ActivatedRoute,
        private _modalService: NgbModal)
    { }

    ngOnInit() {

        this._route.params
            .subscribe(
            res =>
                (
                    this.defaultView = res['view'],
                    console.log(res)
                )
            );

        this.events = this._eventService.getEvents();
        this.header = {
            left: 'prev, next, today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'//,agendaWeek,agendaDay,listYear,listMonth,listWeek,listDay'		
        };


    }

    openModal(value) {
        const modalRef = this._modalService.open(EventModalContent,{size: "lg"});
        modalRef.componentInstance.name = value;
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

        this.openModal(this.event);
        console.log('day clicked' + JSON.stringify(this.event));

    }

    handleEventClick(e: any) {

        this.event = new MyEvent();
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


        console.log('event clicked' + JSON.stringify(this.event));

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
}