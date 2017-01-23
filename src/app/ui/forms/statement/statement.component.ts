import { Statement } from './../../../shared/sdk/models/Statement';
import { StatementApi } from './../../../shared/sdk/services/custom/Statement';
import { VPlocation } from './../../../shared/sdk/models/VPlocation';
import { VPlocationApi } from './../../../shared/sdk/services/custom/VPlocation';
import { BaseFormComponent } from '../baseForm.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const noop = () => {
};

@Component({
  selector: 'le-statement',
  templateUrl: './statement.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StatementComponent,
      multi: true
    }
  ]
})
export class StatementComponent extends BaseFormComponent implements ControlValueAccessor, OnInit {

  @Input('group') statementForm: FormGroup;
  @Input('labels') formLabels2;

  private _id;
  isNew = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() selected = new EventEmitter();

  @Output() removed = new EventEmitter();

  @Output() preparePrint = new EventEmitter();

  private statementItems;
  private statementSel = [];
  private locationItems;
  private locationSel = [];
  private locationName = '';

  constructor(
    private _api: StatementApi,
    private _locApi: VPlocationApi) { 
      super('person');
    }

  ngOnInit() {

    this.selectData();

  }

  selectData() {

    // get statement values
    this._api.find({ order: "name", where: { active: true } }).subscribe(res => {
      this.statementItems = [];
      for (let one of res) {
        this.statementItems.push({ id: (<Statement>one).id, text: (<Statement>one).name });
      }

      // get location values
      this._locApi.find({ where: {personId: this.getUserAppId()}, order: "name" }).subscribe(res => {
        this.locationItems = [];
        for (let one of res)
          this.locationItems.push({ id: (<VPlocation>one).id, text: (<VPlocation>one).name });

        let obj = this.fromIdO(this.locationItems, this.statementForm.value.locationId);

        if (obj && obj.text)
          this.locationName = obj.text;

      });
    });


  }


  public refreshValue(value: any, type: string): void {
    if (type == 'statement')
      this.statementForm.patchValue({ statementId: value.id, name: value.text, relId: 0 });
    else if (type == 'location') {
      this.statementForm.patchValue({ locationId: value.id });
      this.locationName = value.text;
    }
    if (this.statementForm.value.locationId && this.statementForm.value.statementId)
      this.isNew = true;
  }

  public selectedValue(event, type: string): void {
    if (type == 'statement' && this.isNew)
      this.selected.emit(event);
    else if (type == 'location' && this.isNew)
      this.selected.emit(event);
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
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  removestatement(id) {
    this.removed.emit({ 'id': id });
  }

  clickx(id: number) {
    this.preparePrint.emit({ 'id': id });
  }

  //form value browser
  fromIdO(object: any, value: number): any {
    //console.log(value);
    for (let o of object) {
      if (o.id == value)
        return o;
    }
    return null;
  }

}