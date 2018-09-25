// Using examples from:
// https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html

import {
    CognitoIdentityServiceProvider,
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser,
    CognitoUserAttribute,
    ICognitoUserAttributeData,
    ISignUpResult,
    CognitoUserSession,
    ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

import { Observable } from 'rxjs';
import { AppError } from '../shared/sharedTypes';
import { AuthProvider, AuthToken, AppAuthErrors, AppAuthResult, AppAuthResults, UserData } from '../services/auth-service.service';
import { UserPoolData } from './CognitoConfigSecrets';

export class AwsCognito implements AuthProvider {

    poolData: ICognitoUserPoolData = {
        UserPoolId: UserPoolData.UserPoolId,
        ClientId: UserPoolData.ClientId
    };

    cognitoUser?: CognitoUser;
    cognitoSession?: CognitoUserSession;
    userAttributes?: CognitoUserAttribute[];

    private parseUser(user: CognitoUser, attributes: CognitoUserAttribute[]): UserData {

        const userattributes = {};

        let i: number;
        for (i = 0; i < attributes.length; i++) { userattributes[attributes[i].getName()] = attributes[i].getValue(); }

        const parsedUser: UserData = {
            username: userattributes['username'],
            fullname: userattributes['name'],
            alias: userattributes['nickname'],
            email: userattributes['email'],
            birthdate: userattributes['birthDate'],
            phonenumber: userattributes['phone_number'],
            empresaId: userattributes['custom:empresaId'],
        };

        return parsedUser;

    }

    private parseError(error: any): AppError { return { statusCode: 0, message: error }; }

    private authenticateUser(user: CognitoUser, authData: AuthenticationDetails): Observable<AppAuthResult> {

        const strong = this;
        return Observable.create(observer => {

            user.authenticateUser(authData, {

                onSuccess: (session, userConfirmation) => {

                    if (userConfirmation) {

                        this.cognitoUser = user;
                        observer.next(AppAuthResults.AppAuthConfirmationRequired);
                        observer.complete();

                    } else {

                        this.cognitoUser = user;
                        this.cognitoSession = session;
                        observer.next(AppAuthResults.AppAuthAutenticated);
                        observer.complete();

                    }

                },

                onFailure: function(error) {

                    this.cognitoUser = null;
                    this.cognitoSession = null;
                    const authError = this.parseError(error);
                    observer.error(authError);

                },

                newPasswordRequired: function(atributes, required) {

                    console.log('New Password Required !!');
                    console.log(atributes);
                    console.log(required);

                    this.cognitoUser = user;
                    observer.next(AppAuthResults.AppAuthNewPasswordRequired);
                    observer.complete();

                },

                mfaRequired: function(challengeNames, challengeParameters) {

                    console.log('MFA Required !!');
                    console.log(challengeNames);
                    console.log(challengeParameters);

                    this.cognitoUser = user;
                    observer.next(AppAuthResults.AppAuthMFARequired);
                    observer.complete();

                }

            });

        });

    }

    user(): Observable<UserData> {

        const strong = this;
        return Observable.create(observer => {

            if (this.cognitoUser && this.cognitoSession && this.userAttributes) {

                const parsed = this.parseUser(this.cognitoUser, this.userAttributes);
                observer.next(parsed);
                observer.complete();

            } else if (this.cognitoUser && this.cognitoSession) {

                this.cognitoUser.getUserAttributes((error, attributes) => {

                    if (error) {

                        const parsedError = strong.parseError(error);
                        observer.error(parsedError);

                    } else {

                        strong.userAttributes = attributes;
                        const parsed = this.parseUser(this.cognitoUser, this.userAttributes);
                        observer.next(parsed);
                        observer.complete();

                    }

                });

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    idToken(): Observable<AuthToken> {

        const strong = this;
        return Observable.create(observer => {

            if (this.cognitoSession) {

                const parsed = this.cognitoSession.getAccessToken();
                observer.next({ token: parsed.getJwtToken(), expiration: parsed.getExpiration() });
                observer.complete();

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    accessToken(): Observable<AuthToken> {

        const strong = this;
        return Observable.create(observer => {

            if (this.cognitoSession) {

                const parsed = this.cognitoSession.getAccessToken();
                observer.next({ token: parsed.getJwtToken(), expiration: parsed.getExpiration() });
                observer.complete();

            } else { observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    signUp(userData: UserData, password: string): Observable<AppAuthResult> {

        const userPool: CognitoUserPool = new CognitoUserPool(this.poolData);

        const username = userData.username;
        const nickname = new CognitoUserAttribute({Name: 'nickname', Value: userData.alias});
        const birthData = new CognitoUserAttribute({Name: 'birthdate', Value: userData.birthdate});
        const fullname = new CognitoUserAttribute({Name: 'name', Value: userData.fullname});
        const email = new CognitoUserAttribute({Name: 'email', Value: userData.email});
        const phonenumber = new CognitoUserAttribute({Name: 'phone_number', Value: userData.phonenumber});
        const empresaId = new CognitoUserAttribute({Name: 'custom:empresaId', Value: userData.empresaId});
        const attributes = [nickname, fullname, birthData, phonenumber, empresaId, email];

        return Observable.create(observer => {

            userPool.signUp(username, password, attributes, null, (error, result) => {

                if (error) {

                    this.cognitoUser = null;
                    observer.error(error);

                } else {

                    this.cognitoUser = result.user;
                    if (result.userConfirmed) {

                        observer.next(AppAuthResults.AppAuthRegistered);
                        observer.complete();

                    } else {

                        observer.next(AppAuthResults.AppAuthConfirmationRequired);
                        observer.complete();

                    }

                }

            });

        });

    }

    signIn(username: string, password: string): Observable<AppAuthResult> {

        return Observable.create(observer => {
            const authenticationDetails = new AuthenticationDetails({ Username : username, Password : password });
            const userPool: CognitoUserPool = new CognitoUserPool(this.poolData);
            const cognitoUser = new CognitoUser({ Username : username, Pool : userPool });
            this.authenticateUser(cognitoUser, authenticationDetails)
            .toPromise().then(result => { observer.next(result); observer.complete(); }).catch(error => { observer.error(error); });
        });

    }

    confirmMFA(verificationCode: string): Observable<AppAuthResult> {

        return Observable.create(observer => {

            if (this.cognitoUser) {

                this.cognitoUser.sendMFACode(verificationCode, {

                    onSuccess: function (session) {
                        this.cognitoSession = session;
                        observer.next(AppAuthResults.AppAuthAutenticated);
                        observer.complete();
                    },

                    onFailure: function(err) {
                        const authError = this.parseError(err);
                        observer.error(authError);
                    }

                });


            } else {observer.error(AppAuthErrors.AppAuthUserNotSigned); }

        });

    }

    signOut() { if (this.cognitoUser != null) {this.cognitoUser.signOut(); }  }

}
