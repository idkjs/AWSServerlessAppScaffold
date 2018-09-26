import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/auth-service';

@Component({ selector: 'app-topbar', templateUrl: './topbar.component.html', styleUrls: ['./topbar.component.css'] })
export class TopbarComponent implements OnInit {

  loggedUser?: UserData;

  constructor() { }

  ngOnInit() { }

}
