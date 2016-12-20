import { Location } from '@angular/common';
import { BaseFormComponent } from '../baseForm.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../../services/label.service';
import { RoomApi } from '../../../shared/sdk/services/index';
import { Room } from '../../../shared/sdk/models/index';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'room-form',
  templateUrl: './room-form.component.html'
})
export class RoomFormComponent extends BaseFormComponent implements OnInit {

  private data;

  constructor(
    private _labelService: LabelService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _api: RoomApi,
    private _fb: FormBuilder
  ) {
    super('room');
  }

  ngOnInit() {

    this.form = this._fb.group({
      id: [''],
      name: [''],
      onchart: ''
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  back() {
    this._location.back();
  }

  // send model to service and save to db, return to list
  save(model: Room) {

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
  delete(model: Room) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      error => console.log(error),
      () => this.back()
      );

  }
}