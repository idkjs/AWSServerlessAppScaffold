import { Injectable } from '@angular/core';

import {
    IAuthenticationCallback,
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials, config as AWSConfig, AWSError } from 'aws-sdk';

import * as Config from './cognito-config';
import { AuthUser, AuthProvider, AuthProviderCallback } from '../auth.types';
import { AuthService } from '../auth.service';

interface ChallengeParameters {
    CODE_DELIVERY_DELIVERY_MEDIUM: string;
    CODE_DELIVERY_DESTINATION: string;
}

@Injectable()
export class CognitoProvider implements AuthProvider {

    // private static userPoolLoginKey = `cognito-idp.${Config.cognito.userPool.region}.amazonaws.com/${Config.cognito.userPool.UserPoolId}`;

    private userPool = new CognitoUserPool(Config.cognito.userPool);
    private currentStatus = 'unknown';
    private authDetails: AuthenticationDetails;
    private session: CognitoUserSession;
    private cognitoAwsCredentials: CognitoIdentityCredentials;

    constructor() { }

    isLogged(): boolean { return this.session !== undefined; }

    currentUser(callback: (err?: Error, user?: AuthUser) => void) {

        this.getCurrentCognitoUser((err, cognitoUser) => {

            if (cognitoUser && cognitoUser.getUsername()) {
                this.parseAuthUser(cognitoUser, callback);
            } else { callback(err, null); }

        });

    }

    register(userInfo: AuthUser, password: string, callback?: AuthProviderCallback) {

        if (this.isLogged()) { this.signout(); }

        const attributes = this.parseAttributes(userInfo);
        this.userPool.signUp(userInfo.username, password, attributes, null, (err, result) => {

            if (!err) {

                if (result.userConfirmed) {callback(null, AuthService.statusCodes.success);
                } else { callback(null, AuthService.statusCodes.userConfirmationRequired); }

            } else { callback(err, this.parseCognitoError(err)); }

        });

    }

    authenticate(username: string, password: string, callback?: (err: Error, statusCode: string) => void) {

        if (!username || !password) {

            callback(new Error('AuthenticationDetails are incomplete.'), AuthService.statusCodes.incompletedSigninData);
            return;

        }

        const cognitoUser = this.getCognitoUserByUsername(username);
        const handler = this.cognitoResultHandler(cognitoUser, callback);
        const auth = new AuthenticationDetails({ Username: username, Password: password });
        this.authDetails = auth;

        cognitoUser.authenticateUser(auth, handler);

    }

    confirmNewPassword(username: string, newPassword: string, newAttributes: AuthUser, callback?: AuthProviderCallback) {

        if (!this.authDetails) {
            const error: Error = {name: AuthService.statusCodes.authProcessNotInitiated, message: 'AuthProcess Not Initiated!'};
            callback(error, null);
            return;
        }

        const cognitoUser = this.getCognitoUserByUsername(username);
        const newData = newAttributes !== null ? {...newAttributes} : {};
        cognitoUser.authenticateUser(this.authDetails, {

            onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
                this.session = session;
                this.currentStatus = AuthService.statusCodes.success;
                callback(null, AuthService.statusCodes.success);
            },

            onFailure: (err: any) => {  callback(err, this.parseCognitoError(err)); },

            newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
                cognitoUser.completeNewPasswordChallenge(newPassword, newData, {

                    onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
                        this.session = session;
                        this.currentStatus = AuthService.statusCodes.success;
                        callback(null, AuthService.statusCodes.success);
                    },

                    onFailure: (err: any) => {  callback(err, this.parseCognitoError(err)); },

                    mfaRequired: (challengeName: any, challengeParameters: any) => {
                        this.currentStatus = AuthService.statusCodes.mfaCodeRequired;
                        callback(null, AuthService.statusCodes.mfaCodeRequired, {challengeName: challengeName, challengeParameters: challengeParameters});
                    }

                } );
            },

            mfaRequired: (challengeName: any, challengeParameters: any) => {}

        });

    }

    confirmMFA(username: string, confirmationCode: string, callback?: (err: Error, statusCode: string) => void) {

        const cognitoUser = this.getCognitoUserByUsername(username);
        const handler = this.cognitoResultHandler(cognitoUser, callback);
        cognitoUser.sendMFACode(confirmationCode, handler);

    }

    forgotPassword(username: string, callback: (error: Error, statusCode: string) => void) {

        const authService = this;
        const cognitoUser = this.getCognitoUserByUsername(username);

        cognitoUser.forgotPassword({

            onSuccess: function () {
                authService.currentStatus = AuthService.statusCodes.verificationCodeRequired;
                callback(null, AuthService.statusCodes.verificationCodeRequired);
            },

            onFailure: function (err) {

                authService.currentStatus = AuthService.statusCodes.unknownError;
                if (err.name === 'UserNotFoundException') {
                    callback(err, AuthService.statusCodes.noSuchUser);
                } else {
                    callback(err, AuthService.statusCodes.unknownError);
                }

            },

            inputVerificationCode: function (data) {
                authService.currentStatus = AuthService.statusCodes.verificationCodeRequired;
                callback(null, AuthService.statusCodes.verificationCodeRequired);
            }

        });
    }

    confirmPassword(username: string, verficationCode: string, newPassword: string, callback: (error: Error, statusCode: string) => void) {

        if (!username) {
            callback(new Error('Username is Empty.'), AuthService.statusCodes.incompletedSigninData);
            return;
        }

        const authService = this;
        const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool});

        cognitoUser.confirmPassword(verficationCode, newPassword, {

            onSuccess: () => {
                authService.currentStatus = AuthService.statusCodes.passwordChanged;
                callback(null, AuthService.statusCodes.success);
            },

            onFailure: (err: Error) => {
                authService.currentStatus = AuthService.statusCodes.unknownError;
                callback(err, AuthService.statusCodes.unknownError);
            }

        });
    }

    confirmRegistration(username: string, confirmationCode: string, callback: AuthProviderCallback): void {

        const cognitoService = this;
        const cognitoUser = this.getCognitoUserByUsername(username);
        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {

            if (err) { callback(err.message, cognitoService.parseCognitoError(err));
            } else { callback(null, AuthService.statusCodes.success); }

        });

    }

    signout() {

        const currentUser = this.userPool.getCurrentUser();
        if (currentUser) {
            this.userPool.getCurrentUser().signOut();
            this.session = null;
        }

    }

    updateUserInfo(userInfo: AuthUser, callback: (error: Error, statusCode: string) => void): void {

        this.getCurrentCognitoUser((err, cognitoUser) => {

            if (cognitoUser && cognitoUser.getUsername()) {
                const attributes = this.parseAttributes(userInfo).map(value => ({Name: value.getName(), Value: value.getValue()}));
                cognitoUser.updateAttributes(attributes, (errUpdate, result) => {

                    if (!errUpdate) { callback(null, AuthService.statusCodes.success);
                    } else { callback(errUpdate, null); }

                });

            } else { callback(err, null); }

        });

    }

    // getUserAttributes(callback: (err?: Error, data?: Dictionary<any>) => void) {

    //     this.getCurrentCognitoUser((err1, cognitoUser) => {

    //         if (!cognitoUser) {
    //             callback(new Error('Cognito User is not found'));
    //             return;
    //         }

    //         cognitoUser.getUserAttributes((err2?: Error, cognitoAttributes?: CognitoUserAttribute[]) => {

    //             if (err2) {
    //                 callback(err2);
    //                 return;
    //             }

    //             cognitoAttributes = cognitoAttributes || [];
    //             const cognitoAttributesObject = cognitoAttributes.reduce(function (prev, curr) {
    //                 prev[curr.getName()] = curr.getValue();
    //                 return prev;
    //             }, {});

    //             callback(undefined, cognitoAttributesObject);

    //         });

    //     });

    // }

    // setUserAttribute(name: string, value: string, callback: (err?: Error) => void) {

    //     this.getCurrentCognitoUser((err, cognitoUser) => {

    //         if (!cognitoUser) {
    //             callback(new Error('Cognito User is not found'));
    //             return;
    //         }

    //         const cognitoAttributes: ICognitoUserAttributeData[] = [{ Name: name, Value: value }];
    //         cognitoUser.updateAttributes(cognitoAttributes, callback);

    //     });

    // }

    // addAdditionalSignupData(name: string, value: string) {
    //     this.signupData.additionalData = this.signupData.additionalData || {};
    //     this.signupData.additionalData[name] = value;
    // }

    private cognitoResultHandler(user: CognitoUser, callback?: AuthProviderCallback): IAuthenticationCallback {

        return {

            onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
                this.session = session;
                this.currentStatus = AuthService.statusCodes.signedIn;
                callback(null, AuthService.statusCodes.signedIn);
            },

            onFailure: (err: any) => {  callback(err, this.parseCognitoError(err)); },

            newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
                this.currentStatus = AuthService.statusCodes.newPasswordRequired;
                callback(null, AuthService.statusCodes.newPasswordRequired, requiredAttributes);
            },

            mfaRequired: (challengeName: any, challengeParameters: any) => {
                this.currentStatus = AuthService.statusCodes.verificationCodeRequired;
                callback(null, AuthService.statusCodes.mfaCodeRequired, {challengeName: challengeName, challengeParameters: challengeParameters});
            },

            totpRequired: (challengeName: any, challengeParameters: any) => { callback(null, AuthService.statusCodes.notImplemented); },
            customChallenge: (challengeParameters: any) => { callback(null, AuthService.statusCodes.notImplemented); },
            mfaSetup: (challengeName: any, challengeParameters: any) => { callback(null, AuthService.statusCodes.notImplemented); },
            selectMFAType: (challengeName: any, challengeParameters: any) => { callback(null, AuthService.statusCodes.notImplemented); }

        };

    }

    private getCognitoUserByUsername(username?: string): CognitoUser {

        if (!username) { return undefined; }
        const cognitoUser = this.userPool.getCurrentUser();

        if (cognitoUser && cognitoUser.getUsername() === username) {return cognitoUser;
        } else {return new CognitoUser({ Username: username, Pool: this.userPool }); }

    }

    private getCurrentCognitoUser(callback: (err?: Error, cognitoUser?: CognitoUser) => void) {

        const cognitoUser = this.userPool.getCurrentUser();

        if (cognitoUser) {

            cognitoUser.getSession((err: Error, session: CognitoUserSession) => {

                if (!err) {

                    if (session && session.isValid()) { this.session = session; }
                    callback(undefined, cognitoUser);

                } else { callback(err, null); }

            });

        } else { callback(undefined, undefined); }

    }

    private parseAuthUser(info: CognitoUser, callback: (Error, AuthUser) => void): void {

        const customSymbol = 'custom:';
        const user = {custom: {}};

        user['username'] = info.getUsername();
        info.getUserAttributes((err, attributes) => {

            if (!err) {

                attributes.forEach(value => {

                    let keyname = value.getName();
                    const keyvalue = value.getValue();

                    const isCustom = keyname.indexOf(customSymbol);
                    if (isCustom > -1) {
                        keyname = keyname.replace(customSymbol, '');
                        user.custom[keyname] = keyvalue;
                    } else { user[keyname] = keyvalue; }

                });

                callback(null, user);

            } else { callback(err, null); }

        });

    }

    private parseAttributes(info: AuthUser): CognitoUserAttribute[] {

        const attributes: CognitoUserAttribute[] = [];
        const keys = ['email', 'name', 'nickname', 'given_name', 'middle_name',
        'family_name', 'birthdate', 'gender', 'locale', 'phone_number', 'address', 'picture', 'preferred_username',
        'profile', 'timezone', 'updated_at', 'website'];

        for (const keyname of keys) {
            if (info.hasOwnProperty(keyname)) {

                const attribute = new CognitoUserAttribute({Name: keyname, Value: info[keyname]});
                if (info[keyname]) { attributes.push(attribute); }

            }
        }

        const custom = info['custom'];
        if (custom !== null) {
            for (const keyname in custom) {

                if (custom.hasOwnProperty(keyname)) {

                    const attribute = new CognitoUserAttribute({Name: 'custom:' + keyname, Value: custom[keyname]});
                    if (info[keyname]) { attributes.push(attribute); }

                }

            }
        }

        return attributes;

    }

    private parseCognitoError(err: Error): string {

        switch (err.name) {
            case 'InvalidPasswordException':
                return AuthService.statusCodes.invalidPassword;
            case 'InvalidParameterException':
                return AuthService.statusCodes.invalidParameter;
            case 'UserNotFoundException':
                return AuthService.statusCodes.noSuchUser;
            case 'NotAuthorizedException':
                return AuthService.statusCodes.noSuchUser;
            case 'UserNotConfirmedException':
                return AuthService.statusCodes.userConfirmationRequired;
            case 'UsernameExistsException':
                return AuthService.statusCodes.usernameExists;
            case 'CodeMismatchException':
                return AuthService.statusCodes.invalidConfirmationCode;
            default:
                console.log(err);
                return AuthService.statusCodes.unknownError;
        }

    }

}
