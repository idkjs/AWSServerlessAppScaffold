import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-new-password', templateUrl: './new-password.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class NewPasswordComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() { }

  onConfirmation(form: NgForm) {

      const password = form.value.password;
      const confirmed = form.value.confirmed;

      if (password !== confirmed) {

        this.submissionError = 'ConfirmNotMatch';

      } else {

        this.submissionError = null;
        this.submitted = true;
        this.authService.confirmNewPassword(password, null, (err, statusCode) => {

          this.submitted = false;
          console.log(err);
          if (statusCode === AuthService.statusCodes.success) {

            this.submissionStatus = 'Password change is successful. You will be redirected to home page within 3 seconds';
            setTimeout(() => { this.router.navigate([this.authService.startRoute]); }, 3000);
            return;

          } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
            this.router.navigate(['signin']);
            return;

          } else if (statusCode === AuthService.statusCodes.unknownError) {
            this.submissionError = err.message; }

        });

      }

  }

}
