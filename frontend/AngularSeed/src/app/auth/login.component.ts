import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
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

        this.authService.authenticate({username: username, password: password}, (err, statusCode) => {

            this.submitted = false;
            if (statusCode === AuthService.statusCodes.newPasswordRequired) {
                this.router.navigate(['newpassword']);
                return;

            } else if (statusCode === AuthService.statusCodes.verificationCodeRequired) {
                this.router.navigate(['mfaConfirmation']);
                return;

            } else if (statusCode === AuthService.statusCodes.signedIn) {
                this.router.navigate(['home']);
                return;

            } else if (statusCode === AuthService.statusCodes.noSuchUser) {
                this.submissionError = 'Email or password is not valid.';

            } else if (statusCode === AuthService.statusCodes.unknownError) {
                this.submissionError = err.message; }

        });

    }
}
