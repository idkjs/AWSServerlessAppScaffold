import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AwsCognito, UserData } from './providers/aws-cognito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cognito = new AwsCognito();

  onSubmit(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;

    const newUser: UserData = {
      username: username,
      fullname: 'Gustavo Tavares',
      alias: 'myalias',
      email: 'grstavares@gmail.com',
      birthdate: '15/11/1977',
      phonenumber: '+5561992722646',
      empresaId: 'MyCompanyId'
    };


    this.cognito.signIn(username, password);

  }

}
