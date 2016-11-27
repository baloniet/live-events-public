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
            endtime: [{ hour: 12, minute: "30" }]
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

        model.starttime = (<DateFormatter>this._formatter).momentDTL(model.startdate,model.starttime);
        model.endtime = (<DateFormatter>this._formatter).momentDTL(model.startdate,model.endtime);
        
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

        // we have val instead of id on purpose
        if (param.val) {

            //get selected activity 
            Observable.forkJoin(
                this._actApi
                    .findById(param.val),
                this._actApi
                    .getPeople(param.val),
                this._actApi
                    .getAPers(param.val)
            )
                .subscribe(res => {
                    this.prepareActivityData(res[0], res[1], res[2]);
                },
                error => {
                    console.log(error)
                });
        }

        /*this._api.findById(param.id)
            .subscribe(res => {
                this.data = res;
                (<FormGroup>this.form)
                    .setValue(this.data, { onlySelf: true });
            });*/
    }

    // custom methods for this class
    private act = {};
    private teachers = [{}];
    private volunteers = [{}];
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

    //method for select boxes
    public selected(value: any, type: string): void {

        if (type == "room")
            this.roomSel = [{ id: value.id, text: value.text }];
        this.form.markAsDirty();
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
}