import { VTkind } from '../../../shared/sdk/models/VTkind';
import { VTkindApi } from './../../../shared/sdk/services/custom/VTkind';
import { VPlocation } from './../../../shared/sdk/models/VPlocation';
import { VPlocationApi } from './../../../shared/sdk/services/custom/VPlocation';
import { Project } from './../../../shared/sdk/models/Project';
import { ProjectApi } from './../../../shared/sdk/services/custom/Project';
import { ATemplate } from './../../../shared/sdk/models/ATemplate';
import { ATemplateApi } from './../../../shared/sdk/services/custom/ATemplate';
import { Location } from '@angular/common';
import { Type } from './../../../shared/sdk/models/Type';
import { Partner } from './../../../shared/sdk/models/Partner';
import { Kind } from './../../../shared/sdk/models/Kind';
import { APerson } from './../../../shared/sdk/models/APerson';
import { Person } from './../../../shared/sdk/models/Person';
import { Template } from './../../../shared/sdk/models/Template';
import { TypeApi } from './../../../shared/sdk/services/custom/Type';
import { PartnerApi } from './../../../shared/sdk/services/custom/Partner';
import { Activity } from './../../../shared/sdk/models/Activity';
import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APersonApi } from './../../../shared/sdk/services/custom/APerson';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivityApi } from './../../../shared/sdk/services/custom/Activity';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, forwardRef } from '@angular/core';

@Component({
  selector: 'activity-form',
  templateUrl: './activity-form.component.html',
  providers: [LabelService, ActivityApi]
})
export class ActivityFormComponent extends BaseFormComponent implements OnInit {

  private data;
  private themeItems;
  private themeSel = [];
  private locationItems;
  private locationSel = [];
  private projectItems;
  private projectSel = [];
  private typeItems;
  private typeSel = [];
  private partnerItems;
  private partnerSel = [];
  private kindItems;
  private kindSel = [];


  constructor(
    private _labelService: LabelService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ActivityApi,
    private _themeApi: VTkindApi,
    private _typeApi: TypeApi,
    private _partApi: PartnerApi,
    private _vPloc: VPlocationApi,
    private _projectApi: ProjectApi,
    private _apApi: APersonApi,
    private _atApi: ATemplateApi,
    private _location: Location,
    private _locApi: VPlocationApi
  ) {
    super('activity');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      content: [''],
      short: [''],
      teachers: this._fb.array([
        this.initPerson()
      ]),
      volunteers: this._fb.array([
        this.initPerson()
      ]),
      renters: this._fb.array([
        this.initPerson()
      ]),
      templates: this._fb.array([
        this.initTemplate()
      ]),
      themeId: [],
      projectId: [],
      partnerId: [],
      typeId: [],
      kindId: [],
      locationId: [],
      isrented: false,
      isacc: false,
      isoff: false,
      publish: false,
      cdate: [],
      odate: [],
      adate: []
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
        .subscribe(null, error => console.log(error));
    }
  }

  initTemplate() {
    return this._fb.group({
      templateId: [],
      name: [],
      relId: []
    });
  }

  addTemplate(fcName: string) {
    const control = <FormArray>this.form.controls[fcName];
    control.push(this.initTemplate());
    this.form.markAsDirty();
  }

  // delete formcontrol from UI, delete relation from DB
  removeTemplate(i: number, fcName: string, event) {
    const control = <FormArray>this.form.controls[fcName];
    control.removeAt(i);
    this._atApi.deleteById(event.id)
      .subscribe(null, error => console.log(error));
  }

  // call service to find model in db
  selectData(param) {

    // get project values
    this._projectApi.find({ order: "name" }).subscribe(res => {
      this.projectItems = [];
      for (let one of res)
        this.projectItems.push({ id: (<Project>one).id, text: (<Project>one).name });
      this.projectSel = this.selectFirst(this.projectItems);
    });

    // get type values
    this._typeApi.find({ order: "name" }).subscribe(res => {
      this.typeItems = [];
      for (let one of res)
        this.typeItems.push({ id: (<Type>one).id, text: (<Type>one).name });
    });

    if (param.id) {
      // get teachers, volunteers, renters
      Observable.forkJoin(
        this._api.findById(param.id),
        this._api.getPeople(param.id),
        this._api.getAPers(param.id),
        this._api.getTemplates(param.id),
      ).subscribe(
        res => {

          this.data = res[0];

          this.preparePersonComponent(res[1], res[2]);
          this.prepareTemplateComponent(res[3]);
          //patchvalues
          let act = <Activity>res[0];

          this.projectSel = act.projectId ? this.fromId(this.projectItems, act.projectId) : '';
          this.typeSel = act.typeId ? this.fromId(this.typeItems, act.typeId) : '';
          this.preparePartnerValues(act);

          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });

        }, error => {
          console.log(error)
        }
        );
    } else {
      // new activity
      this.preparePartnerValues();
    }
  }

  private preparePartnerValues(act?) {
    // get partner values, we get other values after partner selection
    this._vPloc.partners(this.getUserAppData('personId'))
      .subscribe(res => {
        this.partnerItems = [];
        for (let one of res)
          this.partnerItems.push({ id: one.partner_id, text: one.partName });
        if (act)
          this.partnerSel = act.partnerId ? this.fromId(this.partnerItems, act.partnerId) : this.selectFirst(this.partnerItems);
        else
          this.partnerSel = this.selectFirst(this.partnerItems);
        this.prepareLocationsThemes(act);
      });

  }
  private prepareKindValues(themeId, kId) {
    this._themeApi.find({ where: { partnerId: this.partnerSel[0].id, themeId: themeId }, order: "kindname" })
      .subscribe(res => {
        this.kindItems = [];
        for (let one of res)
          this.kindItems.push({ id: (<VTkind>one).kindId, text: this.lineBreaker((<VTkind>one).kindname, 110) });
        this.kindSel = kId ? this.fromId(this.kindItems, kId) : '';
      });
  }

  private preparePersonComponent(people: [Person], aPers) {

    this.data['teachers'] = [];
    this.data['volunteers'] = [];
    this.data['renters'] = [];

    let t = 0;
    let v = 0;
    let r = 0;
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
      else if (p.isrenter == 1) {
        let person: Person = people.filter(person => person.id == p.personId)[0];
        if (person) {
          (<[{}]>this.data['renters']).push({ id: person.id, name: person.firstname + ' ' + person.lastname, relId: p.id });
          if (r > 0) this.addPerson('renters');
          r++;
        }
      }
    }
    if (t == 0) (<[{}]>this.data['teachers']).push({ id: '', name: '', relId: '' });
    if (v == 0) (<[{}]>this.data['volunteers']).push({ id: '', name: '', relId: '' });
    if (r == 0) (<[{}]>this.data['renters']).push({ id: '', name: '', relId: '' });
    this.form.updateValueAndValidity();
  }

  private prepareTemplateComponent(aTemps: [Template]) {

    this.data['templates'] = [];
    let t = 0;

    for (let p of aTemps) {
      (<[{}]>this.data['templates']).push({ templateId: p.id, name: p.name, relId: p.id });
      if (t > 0) this.addTemplate('templates');
      t++;
    }

    if (t == 0) (<[{}]>this.data['templates']).push({ templateId: '', name: '', relId: '' });

    this.form.updateValueAndValidity();
  }

  // send model to service and save to db, return to list
  save(model: Activity) {
    this.saveModel(model, false);
  }

  // send model to service and save to db, insert new event
  saveAlt(model: Activity) {
    this.saveModel(model, true);
  }

  // send model to service and save to db, return to list or insert new event
  private saveModel(model: Activity, alt: boolean) {
    if (!this.form.pristine) {

      let id;

      // 1. save model - activity theme
      if (this.themeSel[0])
        model.themeId = this.themeSel[0].id;

      // 2. save model - activity project
      if (this.projectSel[0])
        model.projectId = this.projectSel[0].id;

      // 3. save model - activity type
      if (this.typeSel[0])
        model.typeId = this.typeSel[0].id;

      // 4. save model - activity partner
      if (this.partnerSel[0])
        model.partnerId = this.partnerSel[0].id;

      // 5. save model - activity kind
      if (this.kindSel[0])
        model.kindId = this.kindSel[0].id;

      // 6. save model - activity location
      if (this.locationSel[0])
        model.locationId = this.locationSel[0].id;

      this._api.upsert(model)
        .subscribe(

        res => {
          id = (<Activity>res).id;
          //2. save persons (teachers and models)
          this.savePeople((<any>model).teachers, id, 1, 0, 0);    // ugly fix in both cases but it works
          this.savePeople((<any>model).volunteers, id, 0, 1, 0);  // ugly fix in both cases but it works
          this.savePeople((<any>model).renters, id, 0, 0, 1);  // ugly fix in both cases but it works

          //3. save templates
          this.saveTemplate((<any>model).templates, id);  // ugly fix in both cases but it works
          this.form.markAsPristine();
        },
        error => console.log(error),
        () => {
          if (!alt)
            this.back()
          else {
            this._router.navigate(['form/event', { type: 'activity', id: id, generate: 'event' }]);
          }
        });
    }
  }

  // saving person of type isteacher or isvolunteer
  private savePeople(persons, id, isT, isV, isR) {
    for (let person of persons) {
      if (person.relId == 0 && person.id)
        this._apApi.upsert(
          new APerson(
            { activityId: id, personId: person.id, isteacher: isT, isvolunteer: isV, isrenter: isR, id: 0 }
          )
        ).subscribe(null, res => console.log(res));
    }
  }

  // saving templates
  private saveTemplate(templates, id) {
    for (let t of templates) {
      if (t.relId == 0 && t.templateId) {
        this._atApi.upsert(
          new ATemplate(
            { activityId: id, templateId: t.templateId, id: 0 }
          )
        ).subscribe(null, err => console.log(err));
      }
    }
  }


  //method for select boxes
  public selected(value: any, type: string): void {

    if (type == "theme") {
      this.themeSel = [{ id: value.id, text: value.text }];
      this.prepareKindValues(value.id, null);
    }

    if (type == "project")
      this.projectSel = [{ id: value.id, text: value.text }];

    if (type == "type")
      this.typeSel = [{ id: value.id, text: value.text }];

    if (type == "partner") {
      this.partnerSel = [{ id: value.id, text: value.text }];
      this.prepareLocationsThemes();
    }

    if (type == "kind")
      this.kindSel = [{ id: value.id, text: value.text }];

    if (type == "location")
      this.locationSel = [{ id: value.id, text: value.text }];

    this.form.markAsDirty();
  }

  private prepareLocationsThemes(act?) {
    this.locationSel = [];
    this.themeSel = [];
    let id;

    if (this.partnerSel) {
      id = this.partnerSel[0].id;

      //load locations
      this._locApi.find({ where: { partnerId: id, personId: this.getUserAppData('personId') }, order: "name" })
        .subscribe(res => {
          this.locationItems = [];
          for (let one of res)
            this.locationItems.push({ id: (<VPlocation>one).id, text: (<VPlocation>one).name });
          if (act)
            this.locationSel = act.locationId ? this.fromId(this.locationItems, act.locationId) : '';
        });

      //load themes
      this._themeApi.themes(id)
        .subscribe(res => {
          this.themeItems = [];
          for (let one of res)
            this.themeItems.push({ id: one.theme_id, text: one.themeName });
          if (act) {
            this.themeSel = act.themeId ? this.fromId(this.themeItems, act.themeId) : '';
            this.prepareKindValues(this.themeSel[0].id, act.kindId);
          }
        });
    }
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
    this._location.back();
  }

  selectedPerson(val) {
    this.form.markAsDirty();
  }

  selectedTemplate(val) {
    this.form.markAsDirty();
  }
}
