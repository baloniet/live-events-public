import { LocationApi } from './../../../shared/sdk/services/custom/Location';
import { ValuesPipe } from './../../../shared/values.pipe';
import { Room } from './../../../shared/sdk/models/Room';
import { DateFormatter } from './../../../shared/date.formatter';
import { Event } from './../../../shared/sdk/models/Event';
import { APerson } from './../../../shared/sdk/models/APerson';
import { Person } from './../../../shared/sdk/models/Person';
import { Observable } from 'rxjs/Observable';
import { Activity } from './../../../shared/sdk/models/Activity';
import { ActivityApi } from './../../../shared/sdk/services/custom/Activity';
import { EventApi } from './../../../shared/sdk/services/custom/Event';
import { RoomApi } from './../../../shared/sdk/services/custom/Room';
import { BaseFormComponent } from '../baseForm.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

import { LabelService } from '../../../services/label.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

var moment = require('../../../../assets/js/moment.min.js');

const now = new Date();

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css'],
    providers: [LabelService]
})
export class EventFormComponent extends BaseFormComponent implements OnInit {

    private data;
    private roomItems;
    private roomSel = [];

    private rTypeItems = [{ id: 'd', text: "dnevno" }, { id: 'w', text: "tedensko" }, { id: 'M', text: "mesečno" }];;
    private rTypeSel = [{ id: 'd', text: "dnevno" }];

    private rForm: FormGroup;

    private eventss;
    minuteStep = 15;


    private deleteRule: string = 'deleteAllNotFirst';


    constructor(
        private _labelService: LabelService,
        private _route: ActivatedRoute,
        private _api: EventApi,
        private _actApi: ActivityApi,
        private _roomApi: RoomApi,
        private _fb: FormBuilder,
        private _formatter: NgbDateParserFormatter,
        private _location: Location,
        private _locApi: LocationApi
    ) {
        super('event');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            name: ['', Validators.required],
            content: [''],
            roomId: [],
            startdate: ['', Validators.required],
            isday: [],
            starttime: [{ hour: 12, minute: "00" }],
            endtime: [{ hour: 12, minute: "30" }],
            cdate: [],
            activityId: [],
            locationId: [],
            meventId: [],
            isacc: false,
            isoff: false,
            odate: [],
            adate: []
        });

        this.rForm = this._fb.group({
            skipWeekend: true,
            deleteAllNotFirst: true,
            enddate: [''],
            rCnt: ''
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);

    }

    back() {
        this._location.back();
    }

    // send model to service and save to db, return to list
    save(model) {

        model.activityId = this.act['id'];
        model.locationId = this.location.id;    

        if (this.roomSel[0])
            model.roomId = this.roomSel[0].id;
        

        model.starttime = (<DateFormatter>this._formatter).momentDTL(model.startdate, model.starttime);
        model.endtime = (<DateFormatter>this._formatter).momentDTL(model.startdate, model.endtime);

        if (!this.form.pristine) {
            this._api.upsert(model)
                .subscribe(
                res => this.form.markAsPristine(),
                error => console.log(error),
                () => this.back()
                );
        }

    }

    // call service to find model in db
    selectData(param) {

        this.teachers = [{}];
        this.volunteers = [{}];

        // if update find Event
        if (param.action == 'u' || param.action == 'b') {
            this._api.findById(param.id)
                .subscribe(res => {
                    this.data = res;
                    this.prepareDates(this.data);

                    (<FormGroup>this.form).setValue(this.data, { onlySelf: true });
                    this.prepareActivityData4Form((<Event>res).activityId, (<Event>res));
                });
            this._api.find({ where: { meventId: param.id } })
                .subscribe(res => this.eventss = res, error => console.log(error));
        }

        // we have val instead of id on purpose
        if (param.type == "activity" && param.id) {
            this.prepareActivityData4Form(param.id);
        }

    }

    prepareRooms(locationId, evt?) {
        // get rooms based on location
        this._roomApi.find({ where: { locationId: locationId }, order: "name" }).subscribe(res => {
            this.roomItems = [];
            for (let one of res)
                this.roomItems.push({ id: (<Room>one).id, text: (<Room>one).name });
            if (evt)
                this.roomSel = evt.roomId ? this.fromId(this.roomItems, evt.roomId) : '';
        });

    }

    // custom methods for this class
    private act = {};
    private teachers = [{}];
    private volunteers = [{}];
    location;

    private prepareActivityData4Form(actId, evt?) {
        //get selected activity 
        Observable.forkJoin(
            this._actApi.findById(actId),
            this._actApi.getPeople(actId),
            this._actApi.getAPers(actId))
            .subscribe(res => {
                let act = <Activity>res[0];
                this.prepareActivityData(act, res[1], res[2]);
                if (act.locationId) {
                    this.prepareRooms(act.locationId, evt);
                    this._locApi.findById(act.locationId)
                        .subscribe(res => this.location = res,
                        err => console.log(res));
                }
            },
            error => {
                console.log(error)
            });
    }

    // prepare activity data and if generate=event prepare event data
    private prepareActivityData(a: Activity, people: [Person], aPers: [APerson]) {
        this.act = { "name": a.name, "opis": a.content, "id": a.id, "locationId": a.locationId };
        this.preparePersonComponent(people, aPers);

        // if generate is provided then read data from Activity
        if (this.getParam('generate') == 'event') {
            this.form.patchValue({ name: a.name, content: a.content, locationId: a.locationId }, { onlySelf: true });
        }
    }

    private preparePersonComponent(people: [Person], aPers) {

        for (let p of aPers) {
            if (p.isteacher == 1) {
                let person: Person = people.filter(person => person.id == p.personId)[0];
                if (person) {
                    this.teachers.push({ id: person.id, name: person.firstname + ' ' + person.lastname, relId: p.id });
                }
            }
            else if (p.isvolunteer == 1) {
                let person: Person = people.filter(person => person.id == p.personId)[0];
                if (person) {
                    this.volunteers.push({ id: person.id, name: person.firstname + ' ' + person.lastname, relId: p.id });
                }
            }
        }
    }

    private prepareDates(data) {
        if (data.starttime && data.endtime) {
            this.data.startdate = this._formatter.parse(data.starttime);
            this.data.starttime = { hour: moment(data.starttime).hour(), minute: moment(data.starttime).minute() };
            this.data.endtime = { hour: moment(data.endtime).hour(), minute: moment(data.endtime).minute() };
        } else
            this.data.startdate = null;
    }

    //method for select boxes
    public selected(value: any, type: string): void {

        if (type == "room") {
            this.roomSel = [{ id: value.id, text: value.text }];
            this.form.markAsDirty();
        }

        if (type == "rType")
            this.rTypeSel = [{ id: value.id, text: value.text }];
    }

    private setDeleteRule(value) {
        this.deleteRule = value;
    }

    // delete model with service from db, return to list
    delete(model: Event) {
        this.deleteRule = "deleteAll";
        this.deleteEvent();
        this.back();
    }

    private deleteEvent() {
        let id;
        if (this.form.value.meventId == null)
            id = this.form.value.id;
        else
            id = this.form.value.meventId;
        switch (this.deleteRule) {
            case "deleteAllNotFirst":
                this.deleteAllNotFirst(id);
                break;
            case "deleteAll":
                this._api.find({ where: { or: [{ meventId: id }, { id: id }] }, order: 'id DESC' })
                    .subscribe(res => {
                        for (let r of res)
                            this._api.deleteById((<Event>r).id)
                                .subscribe(null, err => console.log(err));
                    }, err => console.log(err), () => this.back());
                break;
            case "deleteNextNotMe": // yes yes this condition four lines down is far beyond common sense
                this._api.find({
                    where: {
                        meventId: id,
                        starttime: { gt: (<DateFormatter>this._formatter).momentDTL(this.data.startdate, this.data.starttime) }
                    }
                })
                    .subscribe(res => {
                        for (let r of res)
                            this._api.deleteById((<Event>r).id)
                                .subscribe(null, err => console.log(err));
                    }, err => console.log(err), () => this.back());

                break;
            case "deleteMe":
                this._api.deleteById(this.form.value.id)
                    .subscribe(null, error => console.log(error), () => this.back());
                break;
            default:
                break;
        }

    }
    // method for repetitions
    private repeatEvent() {

        // get form parameters
        let cnt = this.rForm.value.rCnt;
        let skip = this.rForm.value.skipWeekend;
        let enddate = this.rForm.value.enddate;
        if (enddate) {
            enddate.month--;
            enddate.hour = '23'
            enddate.minute = '59'
        }


        // we need clone not original this.data, check out how moment works
        let rModel = Object.assign({}, this.data);

        // prepare model starttime and endtime
        rModel.starttime = (<DateFormatter>this._formatter).momentDTL(rModel.startdate, rModel.starttime);
        rModel.endtime = (<DateFormatter>this._formatter).momentDTL(rModel.startdate, rModel.endtime);

        // delete existing old repetitions if checked on form
        if (this.rForm.value.deleteAllNotFirst) {
            this.deleteAllNotFirst(this.data.id);
        }

        // loop
        for (let i = 0; i < cnt; i++) {

            // prepare new model starttime and endtime
            rModel.starttime = rModel.starttime.add(1, this.rTypeSel[0].id);
            rModel.endtime = rModel.endtime.add(1, this.rTypeSel[0].id);

            // skip weekend if checked on form
            if (this.rForm.value.skipWeekend) {
                if (rModel.starttime.isoWeekday() < 6)
                    this.saveRepModel(rModel, this.data.id, enddate);
                else i--;
            }
            else
                this.saveRepModel(rModel, this.data.id, enddate);
        }
    }

    paginatorPageSize = 10;
    paginatorECount = 0;

    findEvent(page: number) {
        this._api.find({
            where: { meventId: this.getParam('id') }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
            order: ["starttime", name]
        })
            .subscribe(res => {
                this.eventss = res;
                this.fixListLength(this.paginatorPageSize, this.eventss);

                this._api.count({ meventId: this.getParam('id') })
                    .subscribe(res2 => this.paginatorECount = res2.count);
            });
    }

    private saveRepModel(rModel: Event, id: number, enddate) {
        rModel.meventId = id;
        rModel.id = 0;
        let save = false;

        if (enddate) {
            if (moment(rModel.endtime).valueOf() < moment(enddate).valueOf())
                save = true;
            else
                save = false;
        }
        else
            save = true;

        if (save)
            this._api.upsert(rModel)
                .subscribe(
                null, //res => this.form.markAsPristine(),
                error => console.log(error)
                );
    }

    // delete all events in series, date condition is there because of async
    // new events can be create before all are deleted
    private deleteAllNotFirst(id) {
        this._api.find({ where: { meventId: id, cdate: { lt: new Date() } } })
            .subscribe(res => {
                for (let r of res)
                    this._api.deleteById((<Event>r).id)
                        .subscribe(null, err => console.log(err));
            }, err => console.log(err), () => this.back());
    }

    // add off time based on predefined clicked values
    private setOffTime(m: number) {
        let time = moment(this.form.get('starttime').value).add(m, 'm');
        this.data.endtime = { hour: time.hour(), minute: time.minute() };
        this.form.patchValue({ endtime: this.data.endtime });
        this.form.markAsDirty();
    }
}