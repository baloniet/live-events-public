import { Location } from '@angular/common';
import { Type } from './../../../shared/sdk/models/Type';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../baseForm.component';
import { TypeApi } from './../../../shared/sdk/services/custom/Type';
import { PartnerApi } from './../../../shared/sdk/services/custom/Partner';
import { VPlocationApi } from './../../../shared/sdk/services/custom/VPlocation';

@Component({
  selector: 'type-form',
  templateUrl: './type-form.component.html'
})
export class TypeFormComponent extends BaseFormComponent implements OnInit {

  private data;
  private partnerItems;
  private partnerSel = [];

  constructor(
    private _labelService: LabelService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _api: TypeApi,
    private _partApi: PartnerApi,
    private _vPloc: VPlocationApi,
    private _location: Location,
  ) {
    super('type');
  }

  ngOnInit() {

    // prepare form controls
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required],
      partnerId: ['']
    });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  private preparePartnerValues(act?) {
    // get partner values, we get other values after partner selection
    this._vPloc.partners(this.getUserAppId())
      .subscribe(res => {
        this.partnerItems = [];
        for (let one of res)
          this.partnerItems.push({ id: one.id, text: one.name });
        if (act)
          this.partnerSel = act.partnerId ? this.fromId(this.partnerItems, act.partnerId) : this.selectFirst(this.partnerItems);
      });
  }

  // send model to service and save to db, return to list
  save(model: Type) {

    if (!this.form.pristine) {

      // 1. save model - template partner
      if (this.partnerSel[0])
        model.partnerId = this.partnerSel[0].id;

      // 2. save model - type
      this._api.upsert(model)
        .subscribe(
        res => {
          this.form.markAsPristine();
        },
        this.errMethod,
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
          this.preparePartnerValues(this.data);
          (<FormGroup>this.form)
            .setValue(this.data, { onlySelf: true });
        });
    else
      this.preparePartnerValues();
  }


  // delete model with service from db, return to list
  delete(model: Type) {

    this._api.deleteById(model.id)
      .subscribe(
      null,
      this.errMethod,
      () => this.back()
      );

  }

  back() {
    this._location.back();
  }

  //method for select boxes
  public selected(value: any, type: string): void {

    if (type == "partner") {
      this.partnerSel = [{ id: value.id, text: value.text }];
    }

    this.form.markAsDirty();
  }

}