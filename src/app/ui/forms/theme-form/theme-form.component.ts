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

  constructor(
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
      name: ['', Validators.required]
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

}
