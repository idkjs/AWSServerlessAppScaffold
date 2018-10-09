import { Component, OnInit, Host } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, AuthUser } from '../../auth';
import { NavigationComponent } from '../navigation.component';

@Component({ selector: 'app-top-bar', templateUrl: './top-bar.component.html', styleUrls: ['./top-bar.component.scss'] })
export class TopBarComponent implements OnInit {

    pushRightClass = 'push-right';
    currentUser: AuthUser;

    constructor(private translate: TranslateService, public router: Router, private authService: AuthService, @Host() private navigation: NavigationComponent) {

        this.translate.addLangs(['en', 'pt', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();

        this.translate.use(browserLang.match(/en|pt|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        authService.currentUser((err, user) => {this.currentUser = user; });

    }

    ngOnInit() { }

    getUsername() {
        return this.currentUser !== undefined ? this.currentUser.username : 'Not Logged';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authService.signout();
        setTimeout(() => this.router.navigate([ 'signin' ]), 1000);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    navigateInParent(route: string) {
        this.navigation.navigateTo(route);
    }

}
