import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { routerTransition } from '../router.animations';

@Component({ selector: 'app-signup', templateUrl: './signup.component.html', styleUrls: ['./styles/auth.components.scss'], animations: [routerTransition()] })
export class SignupComponent implements OnInit {

    submitted = false;
    submissionError: string;
    submissionStatus: string;

    constructor(public router: Router, private authService: AuthService) {}

    ngOnInit() {}

    onSubmit(form: NgForm) {

        console.log(form);

        this.submissionError = null;
        this.submitted = true;
        const username = form.value.username;
        const email = form.value.email;
        const password = form.value.password;
        const confirm = form.value.passwordConfirmation;

        if (password !== confirm) {

            this.submissionError = 'Password does not match Confirmation!';
            return;

        } else {

            this.submitted = true;
            const newUser = {username: username, email: email};
            this.authService.register(newUser, password, (err, statusCode) => {

                console.log(err);
                console.log(statusCode);

                this.submitted = false;
                if (statusCode === AuthService.statusCodes.newPasswordRequired) {
                    this.router.navigate(['newpassword']);
                    return;

                } else if (statusCode === AuthService.statusCodes.userConfirmationRequired) {
                    this.router.navigate(['userconfirmation', username]);
                    return;

                } else if (statusCode === AuthService.statusCodes.verificationCodeRequired) {
                    this.router.navigate(['mfaconfirmation', username]);
                    return;

                } else if (statusCode === AuthService.statusCodes.signedIn || statusCode === AuthService.statusCodes.success) {
                    this.submissionStatus = 'Registration Confirmed! You will be redirected to signin page within 3 seconds';
                    setTimeout(() => {this.router.navigate([this.authService.startRoute]); }, 3000);
                    return;

                } else if (statusCode === AuthService.statusCodes.noSuchUser) {
                    this.submissionError = 'Email or password is not valid.';

                } else if (statusCode === AuthService.statusCodes.unknownError) {
                    this.submissionError = err.message; }

            });

        }

    }

}
