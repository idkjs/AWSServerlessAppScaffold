import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-mfa-confirmation', templateUrl: './mfa-confirmation.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class MfaConfirmationComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;
  mfaDetails: string;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() { this.mfaDetails = JSON.stringify(this.authService.challengeInfo()); }

  onConfirmation(form: NgForm) {

    const confirmationCode = form.value.confirmCode;

    if (confirmationCode === undefined || confirmationCode === null || confirmationCode === '') {
      this.submissionError = 'MFA Confirmation Code not Provided!';
      return;
    }

    this.submissionError = null;
    this.submitted = true;
    this.authService.confirmMFA(confirmationCode, (err, statusCode) => {

      this.submitted = false;
      if (statusCode === AuthService.statusCodes.signedIn || statusCode === AuthService.statusCodes.success) {

        this.submissionStatus = 'Confirmation Code Verified. You will be redirected to home page within 3 seconds';
        setTimeout(() => { this.router.navigate([this.authService.startRoute]); }, 3000);
        return;

      } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
        this.router.navigate(['login']);
        return;

      } else if (statusCode === AuthService.statusCodes.unknownError) {
        this.submissionError = err.message;
      }

    });

  }

}
