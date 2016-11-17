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
export class ActivityFormComponent implements OnInit {

  private FORMOBJECT = 'activity';
  private formTitles;
  private formLabels;
  private isDelete;
  private form = new FormGroup({});
  private data;
  private param;

  constructor(
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: ActivityApi
  ) { }

  ngOnInit() {

    this.form = this._fb.group({
      name: ['', Validators.required],
      content: ['']
    });
   // this.prepareStrings(getLabels(this._labelService,this.FORMOBJECT));
    
    this._labelService.getLabels('sl', 'activity')
      .subscribe(
      res => this.prepareStrings(res),
      err => {
        console.log("LabelService error: " + err);
      });


    this._route.params
      .subscribe(
      res => {
        this.param = res;
        if (this.param.action == 'b') {
          this.isDelete = true;
          this.form.disable();
        }
        this.selectData(this.param);
      });

  }


  prepareStrings(labels) {
    console.log(labels);
    this.formTitles = labels.titles;

    this.formLabels = labels.properties;
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
