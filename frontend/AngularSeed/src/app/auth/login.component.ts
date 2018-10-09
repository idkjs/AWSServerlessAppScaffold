import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class LoginComponent implements OnInit {

    submitted = false;
    submissionError: string;

    constructor(public router: Router, private authService: AuthService) {}

    ngOnInit() {}

    onLoggedin(form: NgForm) {

        this.submissionError = null;
        this.submitted = true;
        const username = form.value.username;
        const password = form.value.password;

        this.authService.authenticate(username, password, (err, statusCode) => {

            console.log(err);
            console.log(statusCode);

            this.submitted = false;
            if (statusCode === AuthService.statusCodes.newPasswordRequired) {
                this.router.navigate(['newpassword', username]);
                return;

            } else if (statusCode === AuthService.statusCodes.verificationCodeRequired) {
                this.router.navigate(['mfaconfirmation', username]);
                return;

            } else if (statusCode === AuthService.statusCodes.signedIn || statusCode === AuthService.statusCodes.success ) {
                this.router.navigate([this.authService.startRoute]);
                return;

            } else if (statusCode === AuthService.statusCodes.noSuchUser) {
                this.submissionError = 'Email or password is not valid.';

            } else if (statusCode === AuthService.statusCodes.unknownError) {
                this.submissionError = err.message; }

        });

    }

}
