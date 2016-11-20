
import { APerson } from '../../../shared/sdk';

import { ThemeApi } from './../../../shared/sdk/services/custom/Theme';
import { Activity } from './../../../shared/sdk/models/Activity';
import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { APersonApi } from './../../../shared/sdk/services/custom/APerson';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivityApi } from './../../../shared/sdk/services/custom/Activity';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { getLabels } from '../../../util/util';


@Component({
  selector: 'activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
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
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  initPerson() {
    return this._fb.group({
      id: []
    });
  }

  addPerson(fcName: string) {
    const control = <FormArray>this.form.controls[fcName];
    control.push(this.initPerson());
  }

  removePerson(i: number, fcName: string) {
    const control = <FormArray>this.form.controls[fcName];
    control.removeAt(i);
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
      // get mobileNumber
      Observable.forkJoin(
        this._api.findById(param.id),

      ).subscribe(
        res => {

          this.data = res[0];
          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });

        }, error => {
          console.log(error, 0)
        }
        );
    }
  }


  // send model to service and save to db, return to list
  save(model: Activity) {
    console.log(this.form.controls['teachers'].value);
    let teachers = this.form.controls['teachers'].value;
    for (let t of teachers)
      console.log(t);

    if (!this.form.pristine) {

      // 1. save model - activity
      model.themeId = this.themeSel[0].id;
      console.log(model);
      this._api.upsert(model)
        .subscribe(

        res => {

          //2. save teachers
          this.savePersons(this.form.controls['teachers'].value, 1, 0, res.id);

          //3. save volunteers
          this.savePersons(this.form.controls['volunteers'].value, 0, 1, res.id);

          this.form.markAsPristine();
        },


        error => console.log(error),
        //() => this.back()
      );
    }

  }


  private savePersons(persons, isT, isV, id) {

    for (let p of persons)
      this._apApi.upsert(
        new APerson(
          { activityId: id, personId: p.id, id: 0, isteacher: isT, isvolunteer: isV }
        ))
        .subscribe(null, res => console.log(res));
  }


  //method for select boxes
  public selected(value: any, type: string): void {

    console.log("selected in activity-form.comp", value, type);

    if (type == "theme")
      this.themeSel = [{ id: value.id, text: value.text }];

    if (type == "volunteer")
      null;

    this.form.markAsDirty();
  }

  public refreshValue(value: any, type: string): void {
    console.log("refreshed in activity-form.comp", value, type);
  }

}
