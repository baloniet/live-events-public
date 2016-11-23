import { ErrorTrackerComponent } from './ui/error-tracker/error-tracker.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    //global gui variable for error ErrorTrackerComponent
     sessionStorage.setItem('guiErrorTracker', 'app');
  }
}
