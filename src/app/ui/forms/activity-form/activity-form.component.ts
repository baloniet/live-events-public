import { BaseFormComponent } from '../baseForm.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { APersonApi } from './../../../shared/sdk/services/custom/APerson';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ActivityApi
  ) {
    super('activity');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      name: ['', Validators.required],
      content: ['']
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  // call service to find model in db
  selectData(param) {

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
}
