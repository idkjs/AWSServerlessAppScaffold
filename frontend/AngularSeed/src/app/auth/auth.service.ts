import { Injectable, Inject } from '@angular/core';
import { Dictionary } from '../shared';
import { Router } from '@angular/router';

export interface AuthProvider {
  authenticate(user: SignupData, callback?: (Error, string) => void): void;
  addAdditionalSignupData(name: string, value: string): void;
  getUserAttributes( callback: (err?: Error, data?: Dictionary<any>) => void): void;
  setUserAttribute(name: string, value: string, callback: (err?: Error) => void): void;
  getCurrentUser(callback: (err?: Error, user?: User) => void): void;
  forgotPassword(username: string, callback: (error: Error, statusCode: string) => void): void;
  confirmPassword(verficationCode: string, newPassword: string, callback: (error: Error, statusCode: string) => void): void;
  signout(): void;
  isLogged(): boolean;
}

export interface SignupData {
  username?: string;
  password?: string;
  newPassword?: string;
  verificationCode?: string;
  additionalData?: Dictionary<string>;
}

export class User {
  static default = new User(false);
  constructor(public signedIn: boolean, public username?: string, public userId?: string) { }
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  public static statusCodes = {
    success: 'success',
    signedIn: 'signedIn',
    signedOut: 'signedOut',
    incompletedSigninData: 'incompletedSigninData',
    newPasswordRequired: 'newPasswordRequired',
    verificationCodeRequired: 'verificationCodeRequired',
    passwordChanged: 'passwordChanged',
    noSuchUser: 'noSuchUser',
    unknownError: 'unknownError'
  };

  constructor(@Inject('AUTH_PROVIDER') private provider: AuthProvider, private router: Router) { }

  authenticate(user: SignupData, callback?: (Error, string) => void): void {
    this.provider.authenticate(user, callback); }

  addAdditionalSignupData(name: string, value: string): void {
    this.provider.addAdditionalSignupData(name, value); }

  getUserAttributes( callback: (err?: Error, data?: Dictionary<any>) => void): void {
    this.provider.getUserAttributes(callback); }

  setUserAttribute(name: string, value: string, callback: (err?: Error) => void): void {
    this.provider.setUserAttribute(name, value, callback); }

  getCurrentUser(callback: (err?: Error, user?: User) => void): void {
    this.provider.getCurrentUser(callback); }

  forgotPassword(username: string, callback: (error: Error, statusCode: string) => void): void {
    this.provider.forgotPassword(username, callback); }

  confirmPassword(verficationCode: string, newPassword: string, callback: (error: Error, statusCode: string) => void): void {
    this.provider.confirmPassword(verficationCode, newPassword, callback); }

  signout(): void {
    this.provider.signout();
    this.router.navigate(['']);
  }

  isLogged(): boolean { return this.provider.isLogged(); }

}
