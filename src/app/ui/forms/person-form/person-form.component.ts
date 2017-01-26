import { PEmp } from './../../../shared/sdk/models/PEmp';
import { PEmpApi } from './../../../shared/sdk/services/custom/PEmp';
import { Employment } from './../../../shared/sdk/models/Employment';
import { StatementApi } from './../../../shared/sdk/services/custom/Statement';
import { Statement } from './../../../shared/sdk/models/Statement';
import { PStat } from './../../../shared/sdk/models/PStat';
import { PStatApi } from './../../../shared/sdk/services/custom/PStat';
import { Location } from '@angular/common';
import { Education } from './../../../shared/sdk/models/Education';
import { Citizenship } from './../../../shared/sdk/models/Citizenship';
import { PAddress } from './../../../shared/sdk/models/PAddress';
import { BaseFormComponent } from '../baseForm.component';
import { BasicValidators } from '../../../shared/basicValidators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatter } from '../../../shared/date.formatter';

import { LabelService } from '../../../services/label.service';
import { PersonApi, PCitiApi, PPhoneApi, PAddressApi, PEmailApi, CitizenshipApi, EducationApi, PEduApi, VPlocationApi }
  from '../../../shared/sdk/services/index';
import { Person, PPhone, PEmail, PCiti, PEdu } from '../../../shared/sdk/models/index';


import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

const now = new Date();
const errMethod = err => console.log(err);

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  providers: [LabelService, PersonApi]
})
export class PersonFormComponent extends BaseFormComponent implements OnInit {

  private data;
  private phones: PPhone[];
  private emails: PEmail[];
  private citItems;
  private citSel = [];
  private eduItems;
  private eduSel = [];
  private empItems;
  private empSel = [];
  private minDate: NgbDateStruct;
  private stmtItems;

  isMan = false;
  isWoman = false;
  full = false;
  stmtError = true;

  constructor(
    private _labelService: LabelService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _api: PersonApi,
    private _pCitApi: PCitiApi,
    private _pEduApi: PEduApi,
    private _pEmpApi: PEmpApi,
    private _empApi: PEmpApi,
    private _eduApi: EducationApi,
    private _citApi: CitizenshipApi,
    private _phoneApi: PPhoneApi,
    private _emailApi: PEmailApi,
    private _pAdrApi: PAddressApi,
    private _stApi: PStatApi,
    private _stmtApi: StatementApi,
    private _vplocApi: VPlocationApi,
    private _fb: FormBuilder,
    private _formatter: NgbDateParserFormatter
  ) {
    super('person');
  }

  ngOnInit() {

    this.minDate = { year: 1910, month: 1, day: 1 };

    this.form = this._fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: [],
      cdate: [],
      mobileNumber: ['', Validators.required],//validator za številke
      email: ['', Validators.compose([BasicValidators.email])],
      addresses: this._fb.array([
        this.initAddress()
      ]),
      statements: this._fb.array([
        this.initStatement()
      ]),
      isteacher: false,
      isvolunteer: false,
      ismember: false,
      isemployee: false,
      isrenter: false,
      isuser: false,
      sex: ''
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParamsLocations(this._route, this._vplocApi);
  }

  initAddress() {
    return this._fb.group({
      commune_id: [],
      post_id: [],
      address: [],
      id: []
    });
  }

  addAddress() {
    const control = <FormArray>this.form.controls['addresses'];
    control.push(this.initAddress());
    this.form.markAsDirty();
  }

  // delete formcontrol from UI, delete relation from DB 
  removeAddress(i: number, event) {
    const control = <FormArray>this.form.controls['addresses'];
    control.removeAt(i);
    this._pAdrApi.deleteById(event.id)
      .subscribe(null, error => console.log(error));
  }

  initStatement() {
    return this._fb.group({
      statementId: [],
      locationId: [],
      name: [],
      relId: []
    });
  }

  addStatement(fcName: string) {
    const control = <FormArray>this.form.controls[fcName];
    control.push(this.initStatement());
    this.form.markAsDirty();
  }

  // delete formcontrol from UI, delete relation from DB
  removeStatement(i: number, fcName: string, event) {
    const control = <FormArray>this.form.controls[fcName];
    if (control.length == 1 && fcName == 'statements') {
      control.setErrors({ "error": "mustExistOne" });
      this.stmtError = true;
    }
    else {
      control.removeAt(i);
      this._stApi.deleteById(event.id)
        .subscribe(null, error => console.log(error));
    }
  }


  back() {
    if (!this.error)
      this._location.back();
  }

  // send model to service and save to db, return to list
  save(model) {

    // save
    if (!this.form.pristine && !this.stmtError) {

      // 1. save model - person
      if (this.form.controls['birthdate'].touched || this.form.value.birthdate)
        model.birthdate = (<DateFormatter>this._formatter).formatx(model.birthdate);

      if (this.isMan) model.sex = '1';
      else if (this.isWoman) model.sex = '0';

      this._api.upsert(model)
        .subscribe(

        res => {

          let p = <Person>res;

          //2. save mobileNumber
          if (this.form.controls['mobileNumber'].touched) {
            this._phoneApi.upsert(
              new PPhone(
                { personId: p.id, numbertype: 1, number: (<any>model).mobileNumber }
              ))
              .subscribe(null, res => console.log(res));
          }

          //3. save email
          if (this.form.controls['email'].touched)
            this._emailApi.upsert(
              new PEmail(
                { personId: p.id, emailtype: 1, email: (<any>model).email }
              ))
              .subscribe(null, res => console.log(res));

          //4. save citizenship
          if (this.citSel[0])
            this._pCitApi.upsert(
              new PCiti(
                { personId: p.id, citizenshipId: this.citSel[0].id }
              ))
              .subscribe(null, res => console.log(res));

          //5. save education
          if (this.eduSel[0])
            this._pEduApi.upsert(
              new PEdu(
                { personId: p.id, educationId: this.eduSel[0].id, edutype: 1, id: 0 }
              ))
              .subscribe(null, res => console.log(res));

          //6 save employment
          if (this.empSel[0])
            this._pEmpApi.upsert(
              new PEmp(
                { personId: p.id, employmentId: this.empSel[0].id, emptype: 1, id: 0 }
              ))
              .subscribe(null, res => console.log(res));

          //7. save addresses
          this.saveAddresses((<any>model).addresses, p.id);    // ugly fix in both cases but it works

          //8. save statements
          this.saveStatements((<any>model).statements, p.id);  // ugly fix in both cases but it works

          this.form.markAsPristine();
        },


        error => console.log(error)
        //,() => this.back() this is implemented in save statements
        );
    }

  }

  // saving person of type isteacher or isvolunteer
  private saveAddresses(addresses, id) {
    for (let a of addresses) {
      if (a.id == 0 && a.address)
        this._pAdrApi.upsert(
          new PAddress(
            { personId: id, postId: a.post_id, communeId: a.commune_id, address: a.address, id: 0 }
          )
        ).subscribe(null, res => console.log(res));
    }
  }

  // saving statements
  private saveStatements(statements, id) {
    if (statements) {
      for (let t of statements) {
        if (t.relId == 0 && t.statementId) {
          // first check if statement type already exist for this person and this year
          this._stApi.find({ where: { personId: id, statementId: t.statementId, year: now.getFullYear() } })
            .subscribe(res => {
              if (res.length == 0) {
                this._stApi.upsert(
                  new PStat(
                    { personId: id, statementId: t.statementId, id: 0, locationId: t.locationId }
                  )
                ).subscribe(null, err => console.log(err), () => this.back());
              } else
                this.setError('oneStatement');
            },
            err => console.log(err)
            );
        }
      }
      this.back();
    }
    else
      this.back();
  }


  //citizenship select box
  public selected(value: any, type: string): void {
    if (type == "cit")
      this.citSel = [{ id: value.id, text: value.text }];
    if (type == "edu")
      this.eduSel = [{ id: value.id, text: value.text }];
    this.form.markAsDirty();
  }



  // call service to find model in db
  selectData(param) {

    // get citizenship values
    this._citApi.find({ order: "name" }).subscribe(res => {
      this.citItems = [];
      for (let one of res) {
        this.citItems.push({ id: (<Citizenship>one).id, text: (<Citizenship>one).name });
      }
    });

    // get statement values, this is not ordinary get statement this stmtItems are different!!
    this._stmtApi.find({ order: "name" }).subscribe(res => {
      this.stmtItems = [];
      for (let one of res) {
        this.stmtItems.push({ id: (<Statement>one).id, text: (<Statement>one).name, content: (<Statement>one).content });
      }
    });

    // get education values
    this._eduApi.find({ order: "name" }).subscribe(res => {
      this.eduItems = [];
      for (let one of res) {
        this.eduItems.push({ id: (<Education>one).id, text: (<Education>one).name });
      }
    });

    // get employment values
    this._empApi.find({ order: "name" }).subscribe(res => {
      this.empItems = [];
      for (let one of res) {
        this.empItems.push({ id: (<Employment>one).id, text: (<Employment>one).name });
      }
    });

    this.citSel = [];
    this.eduSel = [];

    // get user locations


    if (param.id) {
      // first get person locations
      this._api.getStats(param.id)
        .subscribe(res => {
          for (let st of res) {
            if (this.getUserLocationsIds().indexOf(st.locationId) > -1) {
              this.prepareFullData(param);
              break;
            }
            else
              this.prepareLessData(param);
          }
        }, errMethod);
    } else
      this.full = true;
  }

  prepareFullData(param) {
    this.full = true;
    Observable.forkJoin(
      this._api.findById(param.id),
      this._api.getPhones(param.id), //filter numbertype=1
      this._api.getEmails(param.id),  //filter emailtype=1
      this._api.getCiti(param.id),
      this._api.getEdu(param.id),
      this._api.getAddss(param.id),
      this._api.getStats(param.id),
      this._api.getEmp(param.id)
    ).subscribe(
      res => {

        this.data = res[0];

        this.data.birthdate = this._formatter.parse(this.data.birthdate);
        this.phones = res[1];
        this.emails = res[2];

        this.data.mobileNumber = this.phones.length > 0 ? this.phones[0].number : '';
        this.data.email = this.emails.length > 0 ? this.emails[0].email : '';
        this.citSel = res[3][0] ? this.fromId(this.citItems, res[3][0]['citizenshipId']) : ''; //res number 3 array 0
        this.eduSel = res[4][0] ? this.fromId(this.eduItems, res[4][0]['educationId']) : '';//res number 4 array 0
        this.empSel = res[7][0] ? this.fromId(this.empItems, res[7][0]['employeeId']) : '';//res number 7 array 0

        if (this.data.sex == 1) this.isMan = true;
        if (this.data.sex == 0) this.isWoman = true;

        this.prepareAddressesComponent(res[5]);
        this.prepareStatementComponent(res[6]);

        (<FormGroup>this.form)
          .setValue(this.data, { onlySelf: true });

      }, errMethod);
  }

  prepareLessData(param) {
    this.full = false;
    this.setLocked(true);

    Observable.forkJoin(
      this._api.findById(param.id),
      this._api.getPhones(param.id), //filter numbertype=1
      this._api.getEmails(param.id),  //filter emailtype=1
    ).subscribe(
      res => {

        this.data = this.clean(res[0]);

        this.data.birthdate = this._formatter.parse(this.data.birthdate);
        this.phones = res[1];
        this.emails = res[2];

        this.data.mobileNumber = this.phones.length > 0 ? this.phones[0].number : '';
        this.data.email = this.emails.length > 0 ? this.emails[0].email : '';

        this.data['addresses'] = [{ commune_id: null, post_id: null, address: null, id: null }];
        this.data['statements'] = [{ statementId: null, locationId: null, name: null, relId: null }];

        (<FormGroup>this.form)
          .setValue(this.data, { onlySelf: true });

      }, errMethod);
  }

  private clean(p: Person): Person {
    let pers = new Person();
    pers.firstname = p.firstname;
    pers.lastname = p.lastname;
    pers.ismember = p.ismember;
    pers.id = p.id;
    pers.birthdate = p.birthdate;
    pers.cdate = null;
    pers.isteacher = null;
    pers.isemployee = null;
    pers.isrenter = null;
    pers.isvolunteer = null;
    pers.isuser = null;
    pers.sex = null;
    p = null;
    return pers;
  }

  // prepare address part of form
  private prepareAddressesComponent(ads: [PAddress]) {

    this.data['addresses'] = [];
    let t = 0;

    for (let a of ads) {
      (<[{}]>this.data['addresses']).push({ address: a.address, id: a.id, post_id: a.postId, commune_id: a.communeId });
      if (t > 0) this.addAddress();
      t++;
    }

    if (t == 0) (<[{}]>this.data['addresses']).push({ id: '', address: '', post_id: '', commune_id: '' });
    this.form.updateValueAndValidity();
  }

  private prepareStatementComponent(aStat: [PStat]) {

    this.data['statements'] = [];
    let s = 0;
    let st;

    for (let p of aStat) {
      st = this.fromId(this.stmtItems, p.statementId);
      (<[{}]>this.data['statements']).push({ statementId: p.statementId, name: st[0].text, relId: p.id, locationId: p.locationId });
      if (s > 0) this.addStatement('statements');
      s++;
    }

    if (s > 0)
      this.stmtError = false;

    //  if (s == 0) (<[{}]>this.data['statements']).push({ statementId: '', name: '', relId: '', locationId: '' });

    this.form.updateValueAndValidity();
  }

  // delete model with service from db, return to list
  delete(model: Person) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }

  sex(v) {
    this.isMan = false;
    this.isWoman = false;
    if (v == 1) this.isMan = true;
    if (v == 0) this.isWoman = true;
    this.form.markAsDirty();
  }

  @ViewChild('dataContainer') dataContainer: ElementRef;
  preparePrint(value) {
    let content = this.fromIdO(this.stmtItems, value.id).content;
    content = content.replace('{{lastname}}', this.data.lastname);
    content = content.replace('{{firstname}}', this.data.firstname);
    content = content.replace('{{email}}', this.data.email);
    content = content.replace('{{mobileNumber}}', this.data.mobileNumber);
    this.dataContainer.nativeElement.innerHTML = content;
    window.print();
  }

  private statementSelected() {
    this.stmtError = false;
    this.form.markAsDirty();
  }

}