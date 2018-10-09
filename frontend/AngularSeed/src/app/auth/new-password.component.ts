import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-new-password', templateUrl: './new-password.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class NewPasswordComponent implements OnInit {

  submitted = false;
  submissionError: string;
  submissionStatus: string;

  private username: string;

  constructor(public router: Router, private fromroute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.username = this.fromroute.snapshot.paramMap.get('username');
  }

  onConfirmation(form: NgForm) {

      const password = form.value.password;
      const confirmed = form.value.confirmed;

      if (password !== confirmed) {

        this.submissionError = 'ConfirmNotMatch';

      } else {

        this.submissionError = null;
        this.submitted = true;
        this.authService.confirmNewPassword(this.username, password, null, (err, statusCode) => {

          this.submitted = false;
          console.log(err);
          if (statusCode === AuthService.statusCodes.success) {

            this.submissionStatus = 'Password change is successful. You will be redirected to signin page within 5 seconds';
            setTimeout(() => {this.router.navigate([this.authService.startRoute]); }, 3000);
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
