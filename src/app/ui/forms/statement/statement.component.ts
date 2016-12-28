import { Statement } from './../../../shared/sdk/models/Statement';
import { StatementApi } from './../../../shared/sdk/services/custom/Statement';
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
export class StatementComponent implements ControlValueAccessor, OnInit {

  @Input('group') statementForm: FormGroup;
  @Input('labels') formLabels;

  private _id;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() selected = new EventEmitter();

  @Output() removed = new EventEmitter();

  @Output() preparePrint = new EventEmitter();

  private statementItems;
  private statementSel = [];

  constructor(private _api: StatementApi) { }

  ngOnInit() {
    this.selectData();
  }

  selectData() {

    // get tempalte values
    this._api.find({ order: "name", where: { active: true } }).subscribe(res => {
      this.statementItems = [];

      for (let one of res) {
        this.statementItems.push({ id: (<Statement>one).id, text: (<Statement>one).name });
      }

    });
  }

  isNew = false;
  public refreshValue(value: any, type: string): void {
    this.statementForm.setValue({ statementId: value.id, name: value.text, relId: 0 });
    this.isNew = true;
  }

  public selectedStatement(event, type: string): void {
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

}