import { VMevent } from './../shared/sdk/models/VMevent';
import { Event } from './../shared/sdk/models/Event';
import { MyEvent } from './../ui/schedule/schedule.proxy';
import { Observable } from 'rxjs/Rx';
import { VEvent } from './../shared/sdk/models/VEvent';
import { VPevent } from './../shared/sdk/models/VPevent';
import { VEventApi } from './../shared/sdk/services/custom/VEvent';
import { VPeventApi } from './../shared/sdk/services/custom/VPevent';
import { VMeventApi } from './../shared/sdk/services/custom/VMevent';
import { EventApi } from './../shared/sdk/services/custom/Event';
import { Injectable, OnInit } from '@angular/core';
var moment = require('../../assets/js/moment.min.js');


import 'rxjs/add/operator/map';
// Service provides events for Scheduler aka Calendar, this are not mouse events:)


@Injectable()
export class ScheduleService {
    schedulerData

    constructor(private _api: VEventApi,
        private _eventApi: EventApi,
        private _peventApi: VPeventApi,
        private _meventApi: VMeventApi) {
    }

    getEvents(start, end) {
        let off;
        this.schedulerData = { data: []};

        // get all events
        this._api.find({ where: { starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
            .subscribe(res => {

                for (let event of res) {
                    let e = <VEvent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();
                    if (e.meventId == null) off = '*'; else off = '';
                    (<[{}]>this.schedulerData.data)
                        .push({ id: e.id, title: e.name + off, start: st, end: et, color: e.color, allDay: e.isday, event: e });
                }
            });

        return this.schedulerData.data;
    }

    getEventsOfRooms(roomIds, start, end) {
        let off;
        this.schedulerData.data = [];

        // get all events
        this._api.find({ where: { roomId: { inq: roomIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
            .subscribe(res => {

                for (let event of res) {
                    let e = <VEvent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();
                    if (e.meventId == null) off = '*'; else off = '';
                    (<[{}]>this.schedulerData.data)
                        .push({ id: e.id, title: e.name + off, start: st, end: et, color: e.color, allDay: e.isday, event: e });
                }
            });

        return this.schedulerData.data;
    }

    getEventsOfPeople(peopleIds, start, end) {

        let data = [];
        let off;
        // get all events
        this._peventApi.find({ where: { personId: { inq: peopleIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
            .subscribe(res => {

                for (let event of res) {
                    let e = <VPevent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();
                    if (e.meventId == null) off = '*'; else off = '';
                    data.push({ id: e.id, title: e.name + off, start: st, end: et, color: e.color, allDay: e.isday, event: e });
                }
            });

        return data;
    }

    getEventsOfMembers(peopleIds, start, end) {

        let data = [];
        let off;
        // get all events
        this._meventApi.find({ where: { personId: { inq: peopleIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
            .subscribe(res => {

                for (let event of res) {
                    let e = <VMevent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();
                    if (e.meventId == null) off = '*'; else off = '';
                    data.push({ id: e.id, title: e.name + off, start: st, end: et, color: e.color, allDay: e.isday, event: e });
                }
            });

        return data;
    }

    updateEvent(calEvent: MyEvent) {
        let e: Event;
        e = calEvent.event;
        e.starttime = new Date(calEvent.start);
        e.endtime = new Date(calEvent.end);
        this._eventApi.upsert(e)
            .subscribe(null, error => console.log(error));
    }

}