import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-user-confirmation', templateUrl: './user-confirmation.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class UserConfirmationComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() { }

  onConfirmation(form: NgForm) {

      const confirmationCode = form.value.confirmCode;

      this.submissionError = null;
      this.submitted = true;
      this.authService.confirmRegistration(confirmationCode, (err, statusCode) => {

        this.submitted = false;
        if (statusCode === AuthService.statusCodes.success) {

          this.submissionStatus = 'Confirmation Code Verified. You will be redirected to home page within 3 seconds';
          setTimeout(() => {this.router.navigate([this.authService.startRoute]); }, 3000);
          return;

        } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
          this.router.navigate(['login']);
          return;

        } else if (statusCode === AuthService.statusCodes.unknownError) {
          this.submissionError = JSON.stringify(err);
        } else {
          console.log(statusCode);
          console.log(err);
        }

      });

  }

}
