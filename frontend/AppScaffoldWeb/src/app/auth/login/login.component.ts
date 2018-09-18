import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {

    const authData: AuthData = {email: form.value.email, password: form.value.password};
    this.authService.login(authData);

  }

}
