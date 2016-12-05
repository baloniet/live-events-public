import { Commune } from './../../../shared/sdk/models/Commune';
import { PostApi } from './../../../shared/sdk/services/custom/Post';
import { CommuneApi } from './../../../shared/sdk/services/custom/Commune';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const noop = () => {
};


@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressComponent,
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor, OnInit {

  @Input('group') addressForm: FormGroup;
  @Input('labels') formLabels;

  private _id;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() selected = new EventEmitter();

  @Output() removed = new EventEmitter();

  private comItems;
  private comSel = [];

  private postItems;
  private postSel = [];

  constructor(
    private _comApi: CommuneApi,
    private _postApi: PostApi)
  { }


  ngOnInit() {
    this.selectData();
  }

  selectData() {
    this._comApi.find({ "order": "name" })
      .subscribe(res => {
        this.comItems = [];
        for (let one of res)
          this.comItems.push({ id: one.id, text: one.name });
      });

    this._postApi.find({ "order": "name" })
      .subscribe(res => {
        this.postItems = [];
        for (let one of res)
          this.postItems.push({ id: one.id, text: one.name });
      });
  }

  isNew = false;
  //method for select boxes
  public selectedValue(value: any, type: string): void {

    if (type == "commune") {
      this.comSel = [{ id: value.id, text: value.text }];
      this.addressForm.patchValue({ id: 0, commune_id: this.comSel[0].id })
    }
    if (type == "post") {
      this.postSel = [{ id: value.id, text: value.text }];

      this.addressForm.patchValue({ id: 0, post_id: this.postSel[0].id })
    }
    this.isNew = true;
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this._id) {
      this._id = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  //get accessor
  get value(): any {
    return this._id;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._id) {
      this._id = v;
      console.log(this._id, 909);
      this.onChangeCallback(v);
    }
  }

  removeAddress(id) {
    this.removed.emit({ 'id': id });
  }

}
