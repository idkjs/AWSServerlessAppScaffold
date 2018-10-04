import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  animations: [routerTransition()] })

export class NewPasswordComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onConfirmation(form: NgForm) {

      const password = form.value.password;
      const confirmed = form.value.confirmed;

      if (password !== confirmed) {

        this.submissionError = 'ConfirmNotMatch';

      } else {

        this.submissionError = null;
        this.submitted = true;
        this.authService.authenticate({ newPassword: password }, (err, statusCode) => {

          this.submitted = false;
          console.log(statusCode);
          if (statusCode === AuthService.statusCodes.signedIn) {

            this.submissionStatus = 'Password change is successful. You will be redirected to signin page within 5 seconds';
            setTimeout(() => { this.authService.signout(); }, 4000);
            return;

          } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
            this.router.navigate(['login']);
            return;

          } else if (statusCode === AuthService.statusCodes.unknownError) {
            this.submissionError = err.message; }

        });

      }

  }

}
