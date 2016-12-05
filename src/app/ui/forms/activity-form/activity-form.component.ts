import { APerson } from './../../../shared/sdk/models/APerson';
import { Person } from './../../../shared/sdk/models/Person';

import { ThemeApi } from './../../../shared/sdk/services/custom/Theme';
import { Activity } from './../../../shared/sdk/models/Activity';
import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APersonApi } from './../../../shared/sdk/services/custom/APerson';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivityApi } from './../../../shared/sdk/services/custom/Activity';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { getLabels } from '../../../util/util';


@Component({
  selector: 'activity-form',
  templateUrl: './activity-form.component.html',
  providers: [LabelService, ActivityApi]
})
export class ActivityFormComponent extends BaseFormComponent implements OnInit {

  private data;
  private themeItems;
  private themeSel = [{ id: 0, text: "_ni določeno" }];

  constructor(
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ActivityApi,
    private _themeApi: ThemeApi,
    private _apApi: APersonApi,
    private _router: Router,
  ) {
    super('activity');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      content: [''],
      teachers: this._fb.array([
        this.initPerson()
      ]),
      volunteers: this._fb.array([
        this.initPerson()
      ]),
      themeId: [],
      cdate: []
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  initPerson() {
    return this._fb.group({
      id: [],
      name: [],
      relId: []
    });
  }

  addPerson(fcName: string) {
    const control = <FormArray>this.form.controls[fcName];
    control.push(this.initPerson());
    this.form.markAsDirty();
  }

  // delete formcontrol from UI, delete relation from DB
  removePerson(i: number, fcName: string, event) {
    const control = <FormArray>this.form.controls[fcName];
    if (control.length == 1 && fcName == 'teachers')
      control.setErrors({ "error": "mustExistOne" })
    else {
        control.removeAt(i);
        this._apApi.deleteById(event.id)
          .subscribe(null,error=>console.log(error));
    }
  }

  // call service to find model in db
  selectData(param) {

    // get theme values
    this._themeApi.find({ order: "name" }).subscribe(res => {
      this.themeItems = [];

      for (let one of res) {
        this.themeItems.push({ id: one.id, text: one.name });

      }
    });

    if (param.id) {
      // get teachers, volunteers
      Observable.forkJoin(
        this._api.findById(param.id),
        this._api.getPeople(param.id),
        this._api.getAPers(param.id)
      ).subscribe(
        res => {

          this.data = res[0];

          this.preparePersonComponent(res[1], res[2]);
          //patchvalues

          this.themeSel = res[0].themeId ? this.fromId(this.themeItems, res[0].themeId) : '';

          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });

        }, error => {
          console.log(error)
        }
        );
    }
  }

  private preparePersonComponent(people: [Person], aPers) {

    this.data['teachers'] = [];
    this.data['volunteers'] = [];

    let t = 0;
    let v = 0;
    for (let p of aPers) {
      if (p.isteacher == 1) {
        let person: Person = people.filter(person => person.id == p.personId)[0];
        if (person) {
          (<[{}]>this.data['teachers']).push({ id: person.id, name: person.firstname + ' ' + person.lastname, relId: p.id });
          if (t > 0) this.addPerson('teachers');
          t++;
        }
      }
      else if (p.isvolunteer == 1) {
        let person: Person = people.filter(person => person.id == p.personId)[0];
        if (person) {
          (<[{}]>this.data['volunteers']).push({ id: person.id, name: person.firstname + ' ' + person.lastname, relId: p.id });
          if (v > 0) this.addPerson('volunteers');
          v++;
        }
      }
    }
    if (t == 0) (<[{}]>this.data['teachers']).push({ id: '', name: '', relId: '' });
    if (v == 0) (<[{}]>this.data['volunteers']).push({ id: '', name: '', relId: '' });
    this.form.updateValueAndValidity();
  }

  // send model to service and save to db, return to list
  save(model: Activity) {

    if (!this.form.pristine) {

      // 1. save model - activity
      model.themeId = this.themeSel[0].id;

      this._api.upsert(model)
        .subscribe(

        res => {

          //2. save persons (teachers and models)
          this.savePeople((<any>model).teachers, res.id, 1, 0);    // ugly fix in both cases but it works
          this.savePeople((<any>model).volunteers, res.id, 0, 1);  // ugly fix in both cases but it works

          this.form.markAsPristine();
        },
        error => console.log(error),
        () => this.back()
        );
    }

  }

  // saving person of type isteacher or isvolunteer
  private savePeople(persons, id, isT, isV) {
    for (let person of persons) {
      if (person.relId == 0)
        this._apApi.upsert(
          new APerson(
            { activityId: id, personId: person.id, isteacher: isT, isvolunteer: isV, id: 0 }
          )
        ).subscribe(null, res => console.log(res));
    }
  }


  //method for select boxes
  public selected(value: any, type: string): void {

    if (type == "theme")
      this.themeSel = [{ id: value.id, text: value.text }];

    if (type == "volunteer")
      null;

    this.form.markAsDirty();
  }


  // delete model with service from db, return to list
  delete(model: Activity) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }


  public refreshValue(value: any, type: string): void {
  }

  back() {
    this._router.navigate(['/genlist/activity']);
  }

}
