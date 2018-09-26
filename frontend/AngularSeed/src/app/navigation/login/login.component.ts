import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(form: NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(form.value.username, form.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
