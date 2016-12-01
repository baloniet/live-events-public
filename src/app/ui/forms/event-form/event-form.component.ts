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
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { LabelService } from '../../../services/label.service';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

var moment = require('../../../../assets/js/moment.min.js');

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css'],
    providers: [LabelService]
})
export class EventFormComponent extends BaseFormComponent implements OnInit {

    private data;
    private roomItems;
    private roomSel = [{ id: 0, text: "_ni določeno" }];

    private rTypeItems = [{ id: 'd', text: "dnevno" }, { id: 'w', text: "tedensko" }, { id: 'M', text: "mesečno" }];;
    private rTypeSel = [{ id: 'd', text: "dnevno" }];

    private rForm: FormGroup;


    private deleteRule: string = 'deleteAllNotFirst';


    constructor(
        private _labelService: LabelService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _api: EventApi,
        private _actApi: ActivityApi,
        private _roomApi: RoomApi,
        private _fb: FormBuilder,
        private _formatter: NgbDateParserFormatter
    ) {
        super('event');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            name: [''],
            content: [''],
            roomId: [],
            startdate: [],
            isday: [],
            starttime: [{ hour: 12, minute: "00" }],
            endtime: [{ hour: 12, minute: "30" }],
            cdate: [],
            activityId: [],
            meventId: []
        });

        this.rForm = this._fb.group({
            skipWeekend: true,
            deleteAllNotFirst: true,
            rCnt: ''
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);

    }

    back() {
        this._router.navigate(['/genlist/event']);
    }

    // send model to service and save to db, return to list
    save(model) {

        model.activityId = this.act['id'];
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

        // get room values
        this._roomApi.find({ order: "name" }).subscribe(res => {
            this.roomItems = [];

            for (let one of res) {
                this.roomItems.push({ id: one.id, text: one.name });
            }
        });

        //if update find Event
        /*        if (param.type == 'event')
                    this._api.findById(param.id)
                        .subscribe(res => {
                            this.data = res;
                            //(<FormGroup>this.form).setValue(this.data, { onlySelf: true });
                            console.log(res);
                        });
        */
        //if update find Event
        if (param.action == 'u')
            this._api.findById(param.id)
                .subscribe(res => {
                    this.data = res;

                    this.prepareDates(this.data);
                    this.roomSel = res.roomId ? this.fromId(this.roomItems, res.roomId) : '';

                    (<FormGroup>this.form).setValue(this.data, { onlySelf: true });

                    this.prepareActivityData4Form(res.activityId);
                });

        // we have val instead of id on purpose
        if (param.type == "activity" && param.id) {
            this.prepareActivityData4Form(param.id);
        }
    }

    // custom methods for this class
    private act = {};
    private teachers = [{}];
    private volunteers = [{}];

    private prepareActivityData4Form(actId) {
        //get selected activity 
        Observable.forkJoin(
            this._actApi
                .findById(actId),
            this._actApi
                .getPeople(actId),
            this._actApi
                .getAPers(actId)
        )
            .subscribe(res => {
                this.prepareActivityData(res[0], res[1], res[2]);
            },
            error => {
                console.log(error)
            });
    }
    private prepareActivityData(a: Activity, people: [Person], aPers: [APerson]) {
        this.act = { "name": a.name, "opis": a.content, "id": a.id };
        this.preparePersonComponent(people, aPers);
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

        this.data.startdate = this._formatter.parse(this.data.starttime);
        this.data.starttime = { hour: moment(this.data.starttime).hour(), minute: moment(this.data.starttime).minute() };
        this.data.endtime = { hour: moment(this.data.endtime).hour(), minute: moment(this.data.endtime).minute() };

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

        this._api.deleteById(model.id)
            .subscribe(
            null,
            error => console.log(error),
            () => this.back()
            );

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
                            this._api.deleteById(r.id)
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
                            this._api.deleteById(r.id)
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
                    this.saveRepModel(rModel, this.data.id);
                else i--;
            }
            else
                this.saveRepModel(rModel, this.data.id);
        }
    }

    private saveRepModel(rModel: Event, id: number) {
        rModel.meventId = id;
        rModel.id = 0;

        this._api.upsert(rModel)
            .subscribe(
            null, //res => this.form.markAsPristine(),
            error => console.log(error),
            () => this.back()
            );
    }

    // delete all events in series, date condition is there because of async
    // new events can be create before all are deleted
    private deleteAllNotFirst(id) {
        this._api.find({ where: { meventId: id, cdate: { lt: new Date() } } })
            .subscribe(res => {
                for (let r of res)
                    this._api.deleteById(r.id)
                        .subscribe(null, err => console.log(err));
            }, err => console.log(err), () => this.back());
    }
}