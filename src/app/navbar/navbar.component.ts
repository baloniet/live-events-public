import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auth: AuthService) { }

  ngOnInit() {
  }

  onSelect(link) {
    this._router.navigate(link);
  }

}
