import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../../services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {

    loading = false;
    submitted = false;

    constructor(

        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() { }

    onSubmit(form: NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (form.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
