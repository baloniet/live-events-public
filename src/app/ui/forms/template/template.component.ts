import { Template } from './../../../shared/sdk/models/Template';
import { TemplateApi } from './../../../shared/sdk/services/custom/Template';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const noop = () => {
};

@Component({
  selector: 'le-template',
  templateUrl: './template.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TemplateComponent,
      multi: true
    }
  ]
})
export class TemplateComponent implements ControlValueAccessor, OnInit {

  @Input('group') templateForm: FormGroup;
  @Input('labels') formLabels;

  private _id;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() selected = new EventEmitter();

  @Output() removed = new EventEmitter();

  private templateItems;
  private tempalteSel = [];

  constructor(private _api: TemplateApi) { }

  ngOnInit() {
    this.selectData();
  }

  selectData() {

    // get tempalte values
    this._api.find({ order: "name", where: { active: true } }).subscribe(res => {
      this.templateItems = [];

      for (let one of res) {
        this.templateItems.push({ id: (<Template>one).id, text: (<Template>one).name });
      }

    });
  }

  isNew = false;
  public refreshValue(value: any, type: string): void {
    console.log(value);
    this.templateForm.setValue({ activityId: this._id, templateId: value.id, relId: 0 });
    this.isNew = true;
  }

  public selectedTemplate(event, type: string): void {
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

  removeTemplate(id) {
    this.removed.emit({ 'id': id });
  }

}
