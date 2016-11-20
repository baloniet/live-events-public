import { PersonApi } from './../../../shared/sdk/services/custom/Person';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input('group') personForm: FormGroup;
  @Input('labels') formLabels;
  @Input('teacher') isTeacher;
  @Input('volunteer') isVolunteer;

  @Output() selected = new EventEmitter();


  private personItems;
  private personSel = [];

  constructor(private _api: PersonApi) {
    this.condition = { isteacher: 0, isvolunteer: 0 };
  }

  ngOnInit() {
    this.selectData();
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
    this.personForm.setValue({id:value.id});
  }

  public selectedPerson(event, type: string): void {
  //  this.selected.emit(event);
  }

}
