import { EPerson } from './../../../shared/sdk/models/EPerson';
import { EPersonApi } from '../../../shared/sdk';
import { VEvent } from './../../../shared/sdk/models/VEvent';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseFormComponent } from '../../forms/baseForm.component';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
var moment = require('./../../../../assets/js/moment.min.js');

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html'
})
export class EventViewComponent extends BaseFormComponent implements OnInit {

  private act = {};
  private prs = {};
  private evt: VEvent;

  private teachers = [{}];
  private volunteers = [{}];

  private activities;
  private eventss;
  private people;
  private series;

  private selEvt;
  private selAct;
  private selPrs;
  private selSerie;

  private type;

  private selectTab;

  paginatorInitPage = 1;
  paginatorPageSize = 10;
  paginatorPCount = 0;
  paginatorECount = 0;
  paginatorACount = 0;
  paginatorSCount = 0;

  actTab = false;
  confirmation = false;

  @ViewChild('t') t;

  constructor(
    private _labelService: LabelService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _evtApi: VEventApi,
    private _actApi: ActivityApi,
    private _actVApi: VActivityApi,
    private _memaApi: VMeventAApi,
    private _memeApi: VMeventEApi,
    private _teaApi: VApersonApi,
    private _memApi: VAmemberApi,
    private _persApi: PersonApi,
    private _epersApi: EPersonApi
  ) {
    super('event-view', 'view');
  }

  ngOnInit() {

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  ngAfterViewInit() {
    if (this.selectTab)
      this.t.select('person');

  }

  //call service to find model in db
  selectData(param) {
    this.confirmation = false;
    this.type = param.type;

    if (param.id && param.type == 'event') {
      this.selectTab = 'series';
      this.selSerie = parseInt(param.id);
      this.selEvt = 1;
      this._evtApi.find({ where: { id: param.id } })
        .subscribe(res => {
          let e = (<VEvent>res[0]);
          if (e.meventId == null)
            this.selEvt = e.id
          else
            this.selEvt = e.meventId;
          this.evt = e;
          this.findActivity(e.activityId);
          this.findSeries(1);
          this.findPeople('', 1);

        });
    } else if (param.id && param.type == 'confirmation') {
      this.findConfirmationEvent(1);
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
        this.findPeople('', 1);
      });

  }

  // custom methods for this class
  prepareActivityData(a) {
    a = a[0]; //creepy
    this.act = a;
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

  findConfirmationEvent(page: number) {
    let start = moment().startOf('day');
    let end = start.clone().add(1, 'day');
    let lbf: LoopBackFilter = {};
    lbf.where = { starttime: { gt: start.format('MM-DD-YYYY') }, endtime: { lt: end.format('MM-DD-YYYY') } };

    this._evtApi.find({ where: lbf.where, order: "starttime", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
      .subscribe(res => {
        this.eventss = res;
        this.fixListLength(this.paginatorPageSize, this.eventss);
        this.confirmation = true;
        this._evtApi.count(lbf.where)
          .subscribe(res => this.paginatorECount = res.count, err => console.log(err));
      });
  }

  private selectEvent(id) {
    this.people = [];
    if (this.selEvt == id) {
      this.selEvt = null;
    }
    else
      this.selEvt = id;
    this.selSerie = {};
    this.series = [];
    this.findSeries(1);

  }

  private selectActivity(id) {
    this.selEvt = null;
    this.selSerie = null;
    this.eventss = [];
    this.people = [];

    if (this.selAct == id)
      this.selAct = null;
    else {
      this.selAct = id;
      this.findEvent(1);
    }
  }

  selectSerie(id) {
    this.people = [];
    if (this.selSerie == id)
      this.selSerie = null;
    else {
      this.selSerie = id;
      this.findPeople('', 1);
    }
  }


  findSeries(page: number) {
    this._evtApi.find({
      where: { activityId: this.selAct, meventId: this.selEvt }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
      order: ["starttime", name]
    })
      .subscribe(res => {
        this.series = res;
        this.fixListLength(this.paginatorPageSize, this.series);

        this._evtApi.count({ activityId: this.selAct, meventId: this.selEvt })
          .subscribe(res2 => this.paginatorSCount = res2.count);
      });
  }


  // find members who are checked in
  findPeople(value: string, page: number) {

    value = '%' + value + '%';

    let lbf: LoopBackFilter = {};

    if (this.selSerie) {
      lbf.where = { and: [{ id: this.selSerie }, { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }] };
      this._memeApi.find({
        where:
        lbf.where
        , limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1),
        order: ["lastname", "firstname"]
      })
        .subscribe(res => {
          this.preparePersonData(res, lbf);
        });
    } //this is almost not important
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
      this._memeApi.find({ where: lbf.where }) // this is intentionaly wrong coded, count() won't work
        .subscribe(res4 => this.paginatorPCount = res4.length);
    else
      this._memaApi.find({ where: lbf.where })// this is intentionaly wrong coded, count() won't work
        .subscribe(res4 => this.paginatorPCount = res4.length);
  }

  error: string;
  public beforeChange($event: NgbTabChangeEvent) {
    /*  console.log(1, $event, $event.nextId, this.selEvt, this.selSerie);
      if (($event.nextId === 'series' || $event.nextId === 'person') && (this.selSerie && !this.confirmation) && !($event.activeId === 'person')) {
        $event.preventDefault();
        // this.error = this.getFTitle('no_act_error');
        setTimeout(() => this.error = null, 5000);
      } else if (($event.nextId === 'events' || $event.nextId === 'person') && this.confirmation) {
        if (!this.selEvt)
          $event.preventDefault();
      } else if ($event.activeId=='series' && $event.nextId=='person' && !this.selSerie){
        $event.preventDefault();
        this.error = this.getFTitle('no_act_error');
        setTimeout(() => this.error = null, 5000);
        
      }*/

    let next = $event.nextId;
    let active = $event.activeId;

    if ((next === 'series' || next === 'person') && active === 'events' && !this.selEvt) {
      $event.preventDefault();
      this.error = this.getFTitle('no_evt_error');
      setTimeout(() => this.error = null, 5000);
    } else if (next === 'person' && active === 'series' && !this.selSerie) {
      $event.preventDefault();
      this.error = this.getFTitle('no_serie_error');
      setTimeout(() => this.error = null, 5000);
    }else if (next === 'person' && active === 'events' && !this.selSerie) {
      $event.preventDefault();
      this.error = this.getFTitle('no_serie_error');
      setTimeout(() => this.error = null, 5000);
    }

  };

  // toggle acknowledge and offcheck for person and specified event
  private toggle(p, type: string) {
    if (type == 'off') {
      if (p.odate)
        p.odate = null;
      else p.odate = moment().format();
    } else if (type = 'ack') {
      if (p.adate)
        p.adate = null;
      else p.adate = moment().format();
    }

    let ep = new EPerson;
    ep.personId = p.personId;
    ep.eventId = p.id;
    ep.adate = p.adate;
    ep.odate = p.odate;
    ep.id = p.epersonId;
    this._epersApi.upsert(ep)
      .subscribe(null, err => console.log(err));
  }

  preparePrint(value) {
    this._router.navigate(['/print', { id: this.selEvt, type: 'event', filter: value }]);
  }
}







