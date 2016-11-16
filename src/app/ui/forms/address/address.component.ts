import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  
  @Input('group') addressForm: FormGroup;
  @Input('labels') formLabels;

  constructor() { }

  ngOnInit() {
    
  }

}
