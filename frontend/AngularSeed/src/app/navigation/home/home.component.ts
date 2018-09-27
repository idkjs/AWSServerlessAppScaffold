import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({ selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() { }

}
