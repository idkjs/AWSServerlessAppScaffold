import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppError } from '../shared/sharedTypes';

export interface UserData {
  username: string;
  fullname: string;
  alias: string;
  email: string;
  birthdate?: string;
  phonenumber?: string;
  empresaId: string;
  token?: string;
}

export interface AuthProvider {
  user: () => Observable<UserData>;
  idToken: () => Observable<AuthToken>;
  accessToken: () => Observable<AuthToken>;
  signUp: (userData: UserData, password: string) => Observable<AppAuthResult>;
  signIn: (username: string, password: string) => Observable<AppAuthResult>;
  signOut: () => void;
  confirmMFA: (verificationCode: string) => Observable<AppAuthResult>;
}

export interface AuthToken {
  token: string;
  expiration: number;
}

export interface AppAuthResult {
  statusCode: number;
  message: string;
}

export class AppAuthResults {
  static AppAuthAutenticated: AppAuthResult = {statusCode: 200, message: 'User Confirmation Required!' };
  static AppAuthRegistered: AppAuthResult = {statusCode: 201, message: 'User Confirmation Required!' };
  static AppAuthConfirmationRequired: AppAuthResult = {statusCode: 401, message: 'User Confirmation Required!' };
  static AppAuthMFARequired: AppAuthResult = {statusCode: 402, message: 'MFA Required!' };
  static AppAuthNewPasswordRequired: AppAuthResult = {statusCode: 403, message: 'User must change Password!' };
}

export class AppAuthErrors {
  static AppAuthUserNotSigned: AppError = {statusCode: 403, message: 'User not Signed!' };
  static AppAuthInvalidUsername: AppError = {statusCode: 404, message: 'Invalid Username!' };
  static AppAuthInvalidUserOrPassword: AppError = {statusCode: 405, message: 'Invalid Username or Password!' };
  static AppAuthInvalidAttributes: AppError = {statusCode: 406, message: 'Invalid Attributes!' };
  static AppAuthPassRulesException: AppError = {statusCode: 407, message: 'Password Rules Exception!' };
  static AppAuthUserNotFound: AppError = {statusCode: 408, message: 'User Not Found!' };
  static AppAuthNotImplemented: AppError = {statusCode: 600, message: 'Mehotd Not Implemeted!' };
  static AppAuthProviderNotAvailable: AppError = {statusCode: 601, message: 'Auth provider is not available!' };
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(@Inject('AUTH_PROVIDER') public provider?: AuthProvider) { }

  user(): Observable<UserData> { return this.provider ? this.provider.user() : this.providerNotAvailable(); }
  idToken(): Observable<AuthToken> { return this.provider ? this.provider.idToken() : this.providerNotAvailable(); }
  accessToken(): Observable<AuthToken> { return this.provider ? this.provider.accessToken() : this.providerNotAvailable(); }

  signIn(username: string, password: string): Observable<AppAuthResult> {

    return this.provider ? this.provider.signIn(username, password) : this.providerNotAvailable();
  }

  signUp(userData: UserData, password: string): Observable<AppAuthResult> {
    return this.provider ? this.provider.signUp(userData, password) : this.providerNotAvailable();
  }

  signOut() { this.provider.signOut(); }

  private providerNotAvailable<T>(): Observable<T> {
    return Observable.create(observer => observer.error(AppAuthErrors.AppAuthProviderNotAvailable));
  }

}
