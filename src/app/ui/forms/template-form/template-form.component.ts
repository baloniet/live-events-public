import { Template } from './../../../shared/sdk/models/Template';
import { Location } from '@angular/common';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TemplateApi } from './../../../shared/sdk/services/custom/Template';

import { BaseFormComponent } from '../baseForm.component';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html'
})
export class TemplateFormComponent extends BaseFormComponent implements OnInit {

  private data;

  constructor(
    private _fb: FormBuilder,
    private _labelService: LabelService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _api: TemplateApi
  ) {
    super('template');
  }

  ngOnInit() {
    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      active: true
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);
  }

  // send model to service and save to db, return to list
  save(model: Template) {

    if (!this.form.pristine) {

      // 1. save model - theme
      this._api.upsert(model)
        .subscribe(
        res => {
          this.form.markAsPristine();
        },
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
  delete(model: Template) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }

  back() {
    this._location.back();
  }
}
