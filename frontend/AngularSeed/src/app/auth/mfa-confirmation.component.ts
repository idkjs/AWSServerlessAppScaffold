import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mfa-confirmation',
  templateUrl: './mfa-confirmation.component.html',
  styleUrls: ['./mfa-confirmation.component.scss'],
  animations: [routerTransition()] })

export class MfaConfirmationComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onConfirmation(form: NgForm) {

      const confirmationCode = form.value.confirmCode;

      this.submissionError = null;
      this.submitted = true;
      this.authService.authenticate({ verificationCode: confirmationCode }, (err, statusCode) => {

        this.submitted = false;
        console.log(statusCode);
        if (statusCode === AuthService.statusCodes.signedIn) {

          this.submissionStatus = 'Confirmation Code Verified. You will be redirected to home page within 5 seconds';
          setTimeout(() => { this.router.navigate(['home']); }, 4000);
          return;

        } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
          this.router.navigate(['login']);
          return;

        } else if (statusCode === AuthService.statusCodes.unknownError) {
          this.submissionError = err.message; }

      });

  }

}
