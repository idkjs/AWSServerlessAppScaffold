import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider, AuthUser, AuthProviderCallback } from './auth.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public static statusCodes = {
    success: 'success',
    signedIn: 'signedIn',
    signedOut: 'signedOut',
    incompletedSigninData: 'incompletedSigninData',
    userConfirmationRequired: 'userConfirmationRequired',
    newPasswordRequired: 'newPasswordRequired',
    mfaCodeRequired: 'mfaCodeRequired',
    verificationCodeRequired: 'verificationCodeRequired',
    passwordChanged: 'passwordChanged',
    noSuchUser: 'noSuchUser',
    invalidPassword: 'invalidPassword',
    invalidParameter: 'invalidParameter',
    invalidConfirmationCode: 'invalidConfirmationCode',
    usernameExists: 'usernameExists',
    unknownError: 'unknownError',
    notImplemented: 'notImplemented',
    authProcessNotInitiated: 'authProcessNotInitiated'
  };

  constructor(@Inject('AUTH_PROVIDER') private provider: AuthProvider, private router: Router, @Inject('HOME_ROUTE') public startRoute: string) { }

  currentUser(callback: (err?: Error, user?: AuthUser) => void): void {
    this.provider.currentUser(callback);
  }

  idToken(): Observable<string> { return this.provider.idToken(); }

  register(userInfo: AuthUser, password: string, callback?: (err: Error, statusCode: string) => void) {
    this.provider.register(userInfo, password, callback);
  }

  authenticate(username: string, password: string, callback?: (Error, string) => void): void {
    this.provider.authenticate(username, password, callback);
  }

  forgotPassword(username: string, callback: (error: Error, statusCode: string) => void): void {
    this.provider.forgotPassword(username, callback);
  }

  requestNewConfirmationCode(callback: AuthProviderCallback): void {
    this.provider.requestNewConfirmationCode(callback); }

  confirmRegistration(confirmationCode: string, callback: AuthProviderCallback): void {
    this.provider.confirmRegistration(confirmationCode, callback);
  }

  confirmNewPassword(newPassword: string,
    newAttributes: AuthUser, callback?: AuthProviderCallback) {
    this.provider.confirmNewPassword(newPassword, newAttributes, callback);
  }

  confirmMFA(confirmationCode: string, callback?: AuthProviderCallback) {
    this.provider.confirmMFA(confirmationCode, callback);
  }

  confirmPassword(username: string, verificationCode: string, newPassword: string, callback: (error: Error, statusCode: string) => void): void {
    this.provider.confirmPassword(username, verificationCode, newPassword, callback);
  }

  signout(): void {
    this.provider.signout();
    this.router.navigate(['']);
  }

  isLogged(): boolean { return this.provider.isLogged(); }

  challengeInfo(): any { return this.provider.challengeInfo(); }

}
