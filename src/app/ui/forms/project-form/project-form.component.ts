import { Location } from '@angular/common';
import { Project } from './../../../shared/sdk/models/Project';
import { ProjectApi } from './../../../shared/sdk/services/custom/Project';

import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, forwardRef } from '@angular/core';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent extends BaseFormComponent implements OnInit {

  private data;

  constructor(
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ProjectApi,
    private _location: Location,
  ) {
    super('project');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required]
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  // send model to service and save to db, return to list
  save(model: Project) {

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
  delete(model: Project) {

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

  // custom methods
  colorPicked(event){
    this.form.value.color=event;
    this.form.markAsTouched(); 
  }

}

