import { Observable } from 'rxjs';
import { AppError } from '../shared/sharedTypes';
import { AuthProvider, AuthToken, AppAuthErrors, AppAuthResult, AppAuthResults, UserData } from '../services/auth-service';

interface PasswordPool {
    username: string;
    password: string;
}

interface LoggedUser {
    user: UserData;
    idToken: AuthToken;
    accessToken: AuthToken;
}

export class MockAuth implements AuthProvider {

    pool: UserData[] = [];
    pwdPool: PasswordPool[] = [];
    logged: LoggedUser;

    constructor() {

        const seedUser: UserData = {
            username: 'default',
            fullname: 'My Name is Default',
            alias: 'aliasDefault',
            email: 'default@test.com',
            birthdate: '15/12/1977',
            phonenumber: '+55618762646',
            empresaId: 'empresaId',
        };

        this.pool.push(seedUser);
        this.pwdPool.push({ username: seedUser.username, password: 'MyLongPwd1234#'});

    }

    user(): Observable<UserData> {

        const strong = this;
        return Observable.create(observer => {

            if (strong.logged) {

                observer.next(strong.logged.user);
                observer.complete();

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    idToken(): Observable<AuthToken> {

        const strong = this;
        return Observable.create(observer => {

            if (strong.logged) {

                observer.next(strong.logged.idToken);
                observer.complete();

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    accessToken(): Observable<AuthToken> {

        const strong = this;
        return Observable.create(observer => {

            if (strong.logged) {

                observer.next(strong.logged.accessToken);
                observer.complete();

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    signUp(userData: UserData, password: string): Observable<AppAuthResult> {

        const parsed = { ...userData };

        const strong = this;
        return Observable.create(observer => {

            strong.pool.push(parsed);
            strong.pwdPool.push({ username: parsed.username, password: password});
            observer.next(AppAuthResults.AppAuthRegistered);
            observer.complete();

        });

    }

    signIn(username: string, password: string): Observable<AppAuthResult> {

        const strong = this;
        return Observable.create(observer => {

            strong.pwdPool.forEach(item => {

                if (item.username === username && item.password === password) {
                    const found = strong.pool.filter(value => value.username === username);
                    const idToken = {token: '', expiration: 0};
                    const accessToken = {token: '', expiration: 0};
                    strong.logged = {user: found[0], accessToken: accessToken, idToken: idToken};
                    observer.next(AppAuthResults.AppAuthAutenticated);
                    observer.complete();
                }

                observer.error(AppAuthErrors.AppAuthInvalidUserOrPassword);

            });

        });

    }

    confirmMFA(verificationCode: string): Observable<AppAuthResult> {

        return Observable.create(observer => {

            observer.error(AppAuthErrors.AppAuthNotImplemented);

        });

    }

    signOut() { this.logged = null;  }

}
