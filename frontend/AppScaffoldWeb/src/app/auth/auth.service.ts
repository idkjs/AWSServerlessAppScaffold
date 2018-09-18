import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data-model';

export class AuthService {

    private user: User;
    private orgIdFake = '123456789';

    authChange = new Subject<boolean>();

    registerUser(authData: AuthData) {

        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString(),
            orgId: this.orgIdFake
        };

        this.authChange.next(true);

    }

    login(authData: AuthData) {

        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString(),
            orgId: this.orgIdFake
        };

        this.authChange.next(true);

    }

    logout() {

        this.user = null;
        this.authChange.next(false);

    }

    getUser() {
        return { ...this.user };
    }

    isAuth(): boolean {
        return this.user != null;
    }

}
