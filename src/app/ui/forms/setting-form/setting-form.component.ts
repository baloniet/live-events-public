import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LabelService } from './../../../services/label.service';
import { SettingsApi } from '../../../shared/sdk/services/index';
import { Settings } from '../../../shared/sdk/models/index';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseForm.component';

@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html'
})
export class SettingFormComponent extends BaseFormComponent implements OnInit {

  private data;

  constructor(
    private _labelService: LabelService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _api: SettingsApi,
    private _fb: FormBuilder
  ) {
    super('setting');
  }

  ngOnInit() {
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  back() {
    this._location.back();
  }

  // send model to service and save to db, return to list
  save(model: Settings) {

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

    if (param.id)
      this._api.findById(param.id)
        .subscribe(res => {
          this.data = res;
          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });
        });
  }

  // delete model with service from db, return to list
  delete(model: Settings) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }

}