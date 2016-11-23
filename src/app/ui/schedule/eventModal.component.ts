import { FormBuilder, FormGroup } from '@angular/forms';
import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'event-modal-content',
  templateUrl: './eventModal.content.html',
  styles: [`
    .custom-day {      
      text-align: center;
      padding: 0.185rem 0.25rem;
      border-radius: 0.25rem;
      display: inline-block;
      width: 2rem;
    }
    .custom-day:hover {
      background-color: #e6e6e6;
    }
    .weekend {
      background-color: #f0ad4e;
      border-radius: 1rem;
      color: white;
    }
    .hidden {
      display: none;
    }
  `]
})
export class EventModalContent {
  @Input() name;

  form: FormGroup
  ;
  constructor(public _activeModal: NgbActiveModal, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({

    });
  }
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
}

@Component({
  selector: 'event-modal-component',
  template: ''
  //template: '<button class="btn btn-lg btn-outline-primary" (click)="open()">Launch demo modal</button>'
})
export class EventModalComponent {
  constructor(private _modalService: NgbModal) {}

  open() {
    const modalRef = this._modalService.open(EventModalContent);
    modalRef.componentInstance.name = 'live-events-event';
  }
}
