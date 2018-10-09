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
        const username = form.value.email;
        const name = form.value.username;
        const email = form.value.email;
        const phone = form.value.phone;
        const password = form.value.password;
        const confirm = form.value.passwordConfirmation;

        if (password !== confirm) {

            this.submissionError = 'Password does not match Confirmation!';
            return;

        } else {

            this.submitted = true;
            const newUser = {username: username, name: name, email: email, phone_number: phone, custom: {empresaId: '12345'}};
            this.authService.register(newUser, password, (err, statusCode) => {

                this.submitted = false;
                if (statusCode === AuthService.statusCodes.newPasswordRequired) {
                    this.router.navigate(['newpassword']);
                    return;

                } else if (statusCode === AuthService.statusCodes.userConfirmationRequired) {
                    this.router.navigate(['userconfirmation']);
                    return;

                } else if (statusCode === AuthService.statusCodes.mfaCodeRequired) {
                    this.router.navigate(['mfaconfirmation']);
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
