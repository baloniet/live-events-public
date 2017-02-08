import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../procbar/procbar.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

}
