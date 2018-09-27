import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecuredRoutes } from './secured.routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const routePath = route.url.length === 0 ? '' : route.url[0].path.toString();

        if (SecuredRoutes.Public.indexOf(routePath) > -1 ) {

            return true;
        } else {
            if (localStorage.getItem('currentUser')) {
                // logged in so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
