import { VPlocationApi } from './../shared/sdk/services/custom/VPlocation';
import { PLocationApi } from './../shared/sdk/services/custom/PLocation';
import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseFormComponent } from '../ui/forms/baseForm.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent extends BaseFormComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _vPLocApi: VPlocationApi) {
    super('navbar')
  }

  ngOnInit() {
    console.log(environment.title);
    this.getProvidedRouteParamsLocations(this._route, this._vPLocApi);

  }

  onSelect(link) {
    this._router.navigate(link);
  }

  helpWindow(event) {
    window.open("help.html", '_blank', 'location=no,height=850,width=700,scrollbars=no,status=no');
  }

}