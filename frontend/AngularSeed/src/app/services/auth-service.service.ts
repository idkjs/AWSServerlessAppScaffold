import { Injectable } from '@angular/core';
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
  static AppAuthInvalidPassword: AppError = {statusCode: 405, message: 'Invalid Password!' };
  static AppAuthInvalidAtrtibutes: AppError = {statusCode: 406, message: 'Invalid Attributes!' };
  static AppAuthPassRulesException: AppError = {statusCode: 407, message: 'Password Rules Exception!' };
}

@Injectable({ providedIn: 'root' })
export class AuthServiceService {

  constructor() { }
}
