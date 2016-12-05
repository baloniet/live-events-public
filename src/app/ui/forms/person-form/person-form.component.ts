import { BaseFormComponent } from '../baseForm.component';
import { BasicValidators } from '../../../shared/basicValidators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatter } from '../../../shared/date.formatter';

import { LabelService } from '../../../services/label.service';
import { PersonApi, PCitiApi, PPhoneApi, PEmailApi, CitizenshipApi, EducationApi, PEduApi }
  from '../../../shared/sdk/services/index';
import { Person, PPhone, PEmail, PCiti, PEdu } from '../../../shared/sdk/models/index';


import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

const now = new Date();

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
  private citSel = [{ id: 0, text: "_ni določeno" }];
  private eduItems;
  private eduSel = [{ id: 0, text: "_ni določeno" }];
  private minDate: NgbDateStruct;

  constructor(
    private _labelService: LabelService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _api: PersonApi,
    private _pCitApi: PCitiApi,
    private _pEduApi: PEduApi,
    private _eduApi: EducationApi,
    private _citApi: CitizenshipApi,
    private _phoneApi: PPhoneApi,
    private _emailApi: PEmailApi,
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
      mobileNumber: [''],//validator za številke
      email: ['', BasicValidators.email],
      addresses: this._fb.array([
        this.initAddress()
      ]),
      isteacher: false,
      isvolunteer: false,
      ismember: false,
      isemployee: false,
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  initAddress() {
    return this._fb.group({
      commune: [],
      post: [],
      address: []
    });
  }

  addAddress() {
    const control = <FormArray>this.form.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.form.controls['addresses'];
    control.removeAt(i);
  }

  back() {
    this._router.navigate(['/genlist/person']);
  }

  // send model to service and save to db, return to list
  save(model) {

    if (!this.form.pristine) {

      // 1. save model - person
      if (this.form.controls['birthdate'].touched || this.form.value.birthdate)
        model.birthdate = (<DateFormatter>this._formatter).formatx(model.birthdate);

      console.log(model);  

      this._api.upsert(model)
        .subscribe(

        res => {

          //2. save mobileNumber
          if (this.form.controls['mobileNumber'].touched)
            this._phoneApi.upsert(
              new PPhone(
                { personId: res.id, numbertype: 1, number: (<any>model).mobileNumber }
              ))
              .subscribe(null, res => console.log(res));

          //3. save email
          if (this.form.controls['email'].touched)
            this._emailApi.upsert(
              new PEmail(
                { personId: res.id, emailtype: 1, email: (<any>model).email }
              ))
              .subscribe(null, res => console.log(res));

          //4. save citizenship

          this._pCitApi.upsert(
            new PCiti(
              { personId: res.id, citizenshipId: this.citSel[0].id }
            ))
            .subscribe(null, res => console.log(res));

          //5. save education
          this._pEduApi.upsert(
            new PEdu(
              { personId: res.id, educationId: this.eduSel[0].id }
            ))
            .subscribe(null, res => console.log(res));

          this.form.markAsPristine();
        },


        error => console.log(error),
        () => this.back()
        );
    }


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
        this.citItems.push({ id: one.id, text: one.name });

      }
    });

    // get education values
    this._eduApi.find({ order: "name" }).subscribe(res => {
      this.eduItems = [];

      for (let one of res) {
        this.eduItems.push({ id: one.id, text: one.name });

      }
    });

    this.citSel = [{ id: 0, text: "_ni določeno" }];
    this.eduSel = [{ id: 0, text: "_ni določeno" }];

    if (param.id) {
      // get mobileNumber
      Observable.forkJoin(
        this._api.findById(param.id),
        this._api.getPhones(param.id), //filter numbertype=1
        this._api.getEmails(param.id),  //filter emailtype=1
        this._api.getCiti(param.id),
        this._api.getEdu(param.id)
      ).subscribe(
        res => {

          this.data = res[0];

          this.data.birthdate = this._formatter.parse(this.data.birthdate);
          this.phones = res[1];
          this.emails = res[2];

          this.data.mobileNumber = this.phones.length > 0 ? this.phones[0].number : '';
          this.data.email = this.emails.length > 0 ? this.emails[0].email : '';
          this.citSel = res[3] ? this.fromId(this.citItems, res[3].citizenshipId) : '';
          this.eduSel = res[4] ? this.fromId(this.eduItems, res[4].educationId) : '';

          this.data.addresses = [{ commune: [], post: [], address: [] }];

          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });

        }, error => {
          console.log(error, 0)
        }
        );
    }
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

  private citValue = '';

  // methods for cit select JL TODO weird?
  public refreshValue(value: any): void {
    this.citValue = value;
  }

}



