import { PersonApi } from './../../../shared/sdk/services/custom/Person';
import { VApersonApi } from './../../../shared/sdk/services/custom/VAperson';
import { VAmemberApi } from './../../../shared/sdk/services/custom/VAmember';
import { LoopBackFilter } from './../../../shared/sdk/models/BaseModels';
import { VActivity } from './../../../shared/sdk/models/VActivity';
import { VActivityApi } from './../../../shared/sdk/services/custom/VActivity';
import { VMeventAApi } from './../../../shared/sdk/services/custom/VMeventA';
import { VMeventEApi } from './../../../shared/sdk/services/custom/VMeventE';
import { Person } from './../../../shared/sdk/models/Person';
import { Observable } from 'rxjs/Rx';
import { Activity } from './../../../shared/sdk/models/Activity';
import { ActivityApi } from './../../../shared/sdk/services/custom/Activity';
import { VEventApi } from './../../../shared/sdk/services/custom/VEvent';
import { ActivatedRoute, Params } from '@angular/router';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../forms/baseForm.component';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html'
})
export class EventViewComponent extends BaseFormComponent implements OnInit {

  private act = {};
  private prs = {};

  private teachers = [{}];
  private volunteers = [{}];

  private activities;
  private eventss;
  private people;

  private selEvt;
  private selAct;
  private selPrs;

  private type;

  paginatorInitPage = 1;
  paginatorPageSize = 10;
  paginatorPCount = 0;
  paginatorECount = 0;
  paginatorACount = 0;

  actTab = false;

  constructor(
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _evtApi: VEventApi,
    private _actApi: ActivityApi,
    private _actVApi: VActivityApi,
    private _memaApi: VMeventAApi,
    private _memeApi: VMeventEApi,
    private _teaApi: VApersonApi,
    private _memApi: VAmemberApi,
    private _persApi: PersonApi
  ) {
    super('event-view', 'view');
  }

  ngOnInit() {

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  //call service to find model in db
  selectData(param) {
    this.type = param.type;
    
    if (param.id && param.type == 'event') {
      this._evtApi.find({ where: { id: param.id } })
        .subscribe(res => {
          this.selEvt = res[0].id;
          this.findActivity(res[0].activityId);
        });
    } else if (param.id && param.type == 'activity') {
      this.selEvt = null;
      this.findActivity(param.id);
    } else if (param.id && param.type == 'teacher') {
      this.selEvt = null;
      this.selAct = null;
      this.actTab = true;
      this.selPrs = param.id;
      this.findActivities('', 1);
      this._persApi.findById(param.id)
        .subscribe(res => this.prs = res);
    } else if (param.id && param.type == 'member') {
      this.selEvt = null;
      this.selAct = null;
      this.actTab = true;
      this.selPrs = param.id;
      this.findActivities('', 1);
      this._persApi.findById(param.id)
        .subscribe(res => this.prs = res);
    }
   
  }

  private findActivities(value: string, page: number) {

    let lbf: LoopBackFilter = {};

    value = '%' + value + '%';

    if (this.type == 'teacher') {
      console.log(lbf.where, '2');
      lbf.where = { personId: this.selPrs, name: { like: value } };

      this._teaApi.find({ where: lbf.where, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
        .subscribe(res => {
          this.activities = res;
          this.fixListLength(this.paginatorPageSize, this.activities);
          this._teaApi.count(lbf.where)
            .subscribe(res2 => this.paginatorACount = res2.count);
        });
    } else if (this.type == 'member') {
      lbf.where = { personId: this.selPrs, name: { like: value } };
      console.log(lbf.where, '1');
      this._memApi.find({ where: lbf.where, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
        .subscribe(res => {
          this.activities = res;
          this.fixListLength(this.paginatorPageSize, this.activities);
          this._memApi.count(lbf.where)
            .subscribe(res2 => this.paginatorACount = res2.count);
        });
    }

  }

  private findActivity(id: number) {
    // get activity data
    Observable.forkJoin(
      this._actVApi.find({ where: { id: id } }),
      this._actApi.getPeople(id),
      this._actApi.getAPers(id)
    )
      .subscribe(res => {

        this.prepareActivityData(res[0]);
        this.preparePersonComponent(res[1], res[2]);
        this.findEvent(1);
        this.findPerson('', 1);
      });

  }

  // custom methods for this class
  prepareActivityData(a: VActivity) {
    a = a[0]; //creepy
    this.act = { "name": a.name, "opis": a.content, "id": a.id, "color": a.color };
    this.selAct = a.id;
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

  findEvent(page: number) {
    this._evtApi.find({
      where: { activityId: this.selAct, meventId: null }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.eventss = res;
        this.fixListLength(this.paginatorPageSize, this.eventss);

        this._evtApi.count({ activityId: this.selAct, meventId: 'null' })
          .subscribe(res2 => this.paginatorECount = res2.count);
      });
  }

  private selectEvent(id) {
    this.people = [];
    if (this.selEvt == id)
      this.selEvt = null;
    else
      this.selEvt = id;
    this.findPerson('', 1);
  }

  private selectActivity(id) {
    this.selEvt = null;
    this.eventss = [];
    this.people = [];

    if (this.selAct == id)
      this.selAct = null;
    else {
      this.selAct = id;
      this.findEvent(1);
    }
  }



  // find members who are checked in
  findPerson(value: string, page: number) {

    value = '%' + value + '%';

    let lbf: LoopBackFilter = {};


    if (this.selEvt) {
      lbf.where = { and: [{ id: this.selEvt }, { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }] };
      this._memeApi.find({
        where:
        lbf.where
        , limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
        order: ["lastname", "firstname"]
      })
        .subscribe(res => {
          this.preparePersonData(res, lbf);
        });
    }
    else {
      lbf.where = { and: [{ id: this.selAct }, { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }] };
      this._memaApi.find({
        where:
        lbf.where
        , limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
        order: ["lastname", "firstname"]
      })
        .subscribe(res => {
          this.preparePersonData(res, lbf);
        });
    }
  }

  private preparePersonData(res, lbf) {
    this.people = res;

    this.fixListLength(this.paginatorPageSize, this.people);

    if (this.selEvt)
      this._memeApi.count(lbf.where)
        .subscribe(res2 => this.paginatorPCount = res2.count);
    else
      this._memaApi.count(lbf.where)
        .subscribe(res2 => this.paginatorPCount = res2.count);
  }

  error: string;
  public beforeChange($event: NgbTabChangeEvent) {
    if (($event.nextId === 'events' || $event.nextId === 'person') && !this.selAct) {
      $event.preventDefault();
      this.error = this.getFTitle('no_act_error');
      setTimeout(() => this.error = null, 5000);
    }
  };

}
