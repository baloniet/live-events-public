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

    getEvents(start, end, locationIds?) {
        let off;
        this.schedulerData = { data: [] };

        let condition;
        if (!locationIds)
            condition = { where: { starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } }
        else
            condition = { where: { locationId: { inq: locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } };

        // get all events
        this._api.find(condition)
            .subscribe(res => {

                for (let event of res) {
                    let e = <VEvent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();

                    if (e.meventId == null) off = '*'; else off = '';

                    let color = '';
                    if (e.isacc == 1) color = e.color; else color = '#FBFBFB';
                    if (e.isoff == 1) color = '#FF0000';

                    (<[{}]>this.schedulerData.data)
                        .push({ id: e.id, title: e.name + off, start: st, end: et, color: color, allDay: e.isday, event: e });
                }
            });

        return this.schedulerData.data;
    }

    getEventsOfRooms(roomIds, start, end) {
        let off;
        let data = [];

        // get all events
        this._api.find({ where: { roomId: { inq: roomIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
            .subscribe(res => {

                for (let event of res) {
                    let e = <VEvent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();

                    let color = '';
                    if (e.isacc == 1) color = e.color; else color = '#FBFBFB';

                    if (e.meventId == null) off = '*'; else off = '';
                    data.push({ id: e.id, title: e.name + off, start: st, end: et, color: color, allDay: e.isday, event: e });
                }
            });

        return data;
    }

    getEventsOfPeople(peopleIds, start, end, locationIds?) {

        let data = [];
        let off;

        let ids = [];

        let condition;
        if (!locationIds)
            condition = { where: { personId: { inq: peopleIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } }
        else
            condition = { where: { personId: { inq: peopleIds }, locationId: { inq: locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } };

        // get all events
        this._peventApi.find(condition)
            .subscribe(res => {

                for (let event of res) {
                    let e = <VPevent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();

                    let color = '';
                    if (e.isacc == 1) color = e.color; else color = '#FBFBFB';

                    if (e.meventId == null) off = '*'; else off = '';

                    if (ids.indexOf(e.id) < 0) {
                        data.push({ id: e.id, title: e.name + off, start: st, end: et, color: color, allDay: e.isday, event: e });
                        ids.push(e.id);
                    }
                }

            });

        return data;
    }

    getEventsOfMembers(peopleIds, start, end, locationIds?) {

        let data = [];
        let off;

        let ids = [];

        let condition;
        if (!locationIds)
            condition = { where: { personId: { inq: peopleIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } }
        else
            condition = { where: { personId: { inq: peopleIds }, locationId: { inq: locationIds }, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } };

        // get all events
        this._meventApi.find(condition)
            .subscribe(res => {

                for (let event of res) {
                    let e = <VMevent>event;
                    let st = moment(e.starttime).local();
                    let et = moment(e.endtime).local();

                    let color = '';
                    if (e.isacc == 1) color = e.color; else color = '#FBFBFB';

                    if (e.meventId == null) off = '*'; else off = '';
                    if (ids.indexOf(e.id) < 0) {
                        data.push({ id: e.id, title: e.name + off, start: st, end: et, color: color, allDay: e.isday, event: e });
                        ids.push(e.id);
                    }
                }
            });

        return data;
    }

    updateEvent(calEvent: MyEvent) {
        let e: Event;
        e = calEvent.event;
        e.starttime = moment(calEvent.start).subtract(1,'h'); // this is fullcalendar fix
        e.endtime = moment(calEvent.end).subtract(1,'h');; // this is fullcalendar fix
        this._eventApi.upsert(e)
            .subscribe(null, error => console.log(error));
    }

}