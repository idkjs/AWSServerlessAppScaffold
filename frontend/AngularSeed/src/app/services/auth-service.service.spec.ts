import { TestBed, inject } from '@angular/core/testing';

import { AuthService, AppAuthResults, UserData, AppAuthErrors } from './auth-service.service';
import { MockAuth } from '../providers/mock-authenticador';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'AUTH_PROVIDER',  useValue: new MockAuth()},
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a provider', inject([AuthService], (service: AuthService) => {
    expect(service.provider).toBeTruthy();
  }));

  it('should accept SignIn', inject([AuthService], (service: AuthService) => {
    service.signIn('default', 'MyLongPwd1234#')
    .toPromise()
    .then(result => {expect(result).toEqual(AppAuthResults.AppAuthAutenticated); })
    .catch(error => {throw(error); });
  }));

  it('should not accept SignIn with Wrong Password', inject([AuthService], (service: AuthService) => {
    service.signIn('default', 'MyShortPwd')
    .toPromise()
    .then(result => {throw(result); })
    .catch(error => {expect(error).toEqual(AppAuthErrors.AppAuthInvalidUserOrPassword); });
  }));

  it('should accept SignUp', inject([AuthService], (service: AuthService) => {
    const newUser: UserData = {
      username: 'kennedyj',
      fullname: 'John Fitzgerald Kennedy',
      alias: 'JFK',
      email: 'jfk@whitehouse.gov',
      birthdate: '12/12/1942',
      phonenumber: '+16599835',
      empresaId: 'wh123213'
    };

    service.signUp(newUser, 'MyLongPwd1234#')
    .toPromise()
    .then(result => {expect(result).toEqual(AppAuthResults.AppAuthRegistered); })
    .catch(error => {throw(error); });
  }));

});
