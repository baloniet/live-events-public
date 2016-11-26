import { ColorPickerService } from 'angular2-color-picker/lib';
import { Theme } from './../../../shared/sdk/models/Theme';
import { ThemeApi } from './../../../shared/sdk/services/custom/Theme';

import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { getLabels } from '../../../util/util';


@Component({
  selector: 'theme-form',
  templateUrl: './theme-form.component.html',
  providers: [LabelService, ThemeApi]
})
export class ThemeFormComponent extends BaseFormComponent implements OnInit {

  private data;
  //private color: string = "#127bdc";
  presetColors = [
    "#ff4000", "#ff8000", "#ffbf00", "#ffff00", "#bfff00", "#80ff00", "#40ff00", "#00ff00", "#00ff40", "#00ff80",
    "#00ffbf", "#00ffff", "#00bfff", "#0080ff", "#0040ff", "#0000ff", "#4000ff", "#8000ff", "#bf00ff", "#ff00ff",
    "#ff00bf", "#ff0080", "#ff0040", "#ff0000"
  ];

  constructor(
    private cpService: ColorPickerService,
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ThemeApi,
    private _router: Router,
  ) {
    super('theme');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      color: '#FFF'
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  // send model to service and save to db, return to list
  save(model: Theme) {

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
  delete(model: Theme) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }

  back() {
    this._router.navigate(['/genlist/theme']);
  }

  // custom methods
  colorPicked(event){
    this.form.value.color=event;
    this.form.markAsTouched(); 
  }

}
