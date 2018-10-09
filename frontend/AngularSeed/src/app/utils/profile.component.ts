import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { AuthService, AuthUser } from '../auth';

@Component({ selector: 'app-profile', templateUrl: './profile.component.html', animations: [routerTransition()] })
export class ProfileComponent implements OnInit {

  currentUser: AuthUser;

  constructor(private authService: AuthService) {
    authService.currentUser((err, user) => {this.currentUser = user; });
  }

  ngOnInit() { }

  onSubmit(form: NgForm) { }

}
