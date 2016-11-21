import { PersonApi } from './../../../shared/sdk/services/custom/Person';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

const noop = () => {
};

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PersonComponent,
      multi: true
    }
  ]
})
export class PersonComponent implements ControlValueAccessor, OnInit {

  @Input('group') personForm: FormGroup;
  @Input('labels') formLabels;
  @Input('teacher') isTeacher;
  @Input('volunteer') isVolunteer;
  private _id;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() selected = new EventEmitter();

  @Output() removed = new EventEmitter();


  private personItems;
  private personSel = [];

  constructor(private _api: PersonApi) {
    this.condition = { isteacher: 0, isvolunteer: 0 };
  }

  ngOnInit() {
    this.selectData();
//    (<FormControl>this.personForm.controls['name']).setValue('123');
  }

  private condition: { isteacher: number, isvolunteer: number };

  selectData() {
    this.condition.isteacher = this.isTeacher == true ? 1 : 0;
    this.condition.isvolunteer = this.isVolunteer == true ? 1 : 0;

    // get person values
    this._api.find({ order: "lastname", where: this.condition }).subscribe(res => {
      this.personItems = [];

      for (let one of res) {
        this.personItems.push({ id: one.id, text: one.firstname + ' ' + one.lastname });

      }
    });
  }

  public refreshValue(value: any, type: string): void {
    this.personForm.setValue({ id: value.id });
  }

  public selectedPerson(event, type: string): void {
    //  this.selected.emit(event);
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
            console.log(this._id,909);
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    removePerson(event,id){
      this.removed.emit({'id':id});
    }
}
