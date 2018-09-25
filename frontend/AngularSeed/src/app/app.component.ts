import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AwsCognito } from './providers/aws-cognito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularSeed';
  cognito = new AwsCognito();

  onSubmit(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;

    this.cognito.signIn(username, password);

  }

}
