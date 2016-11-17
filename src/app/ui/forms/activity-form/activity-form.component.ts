import { LabelService } from './../../../services/label.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
  providers: [LabelService]
})
export class ActivityFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
