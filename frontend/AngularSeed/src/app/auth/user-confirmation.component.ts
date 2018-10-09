import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-user-confirmation', templateUrl: './user-confirmation.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class UserConfirmationComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  private username: string;

  constructor(public router: Router, private fromroute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.username = this.fromroute.snapshot.paramMap.get('username');
  }

  onConfirmation(form: NgForm) {

      const confirmationCode = form.value.confirmCode;

      this.submissionError = null;
      this.submitted = true;
      this.authService.confirmRegistration(this.username, confirmationCode, (err, statusCode) => {

        this.submitted = false;
        if (statusCode === AuthService.statusCodes.success) {

          this.submissionStatus = 'Confirmation Code Verified. You will be redirected to home page within 5 seconds';
          setTimeout(() => { this.router.navigate(['home']); }, 4000);
          return;

        } else if (statusCode === AuthService.statusCodes.incompletedSigninData) {
          this.router.navigate(['login']);
          return;

        } else if (statusCode === AuthService.statusCodes.unknownError) {
          this.submissionError = JSON.stringify(err); }

      });

  }

}
