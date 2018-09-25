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

import { UserPoolData } from './CognitoConfigSecrets';
import { Observable } from 'rxjs';

export interface UserData {
    username: string;
    fullname: string;
    alias: string;
    birthdate?: string;
    phonenumber?: string;
    empresaId: string;
    token?: string;
}

export class AwsCognito {

    poolData: ICognitoUserPoolData = {
        UserPoolId: UserPoolData.UserPoolId,
        ClientId: UserPoolData.ClientId
    };

    signUp(userData: UserData, password: string) {

        const userPool: CognitoUserPool = new CognitoUserPool(this.poolData);

        const username = userData.username;

        const nickname = new CognitoUserAttribute({Name: 'nickname', Value: userData.alias});
        const birthData = new CognitoUserAttribute({Name: 'birthdate', Value: userData.birthdate});
        const phonenumber = new CognitoUserAttribute({Name: 'phone_number', Value: userData.phonenumber});
        const empresaId = new CognitoUserAttribute({Name: 'custom:empresaId', Value: userData.empresaId});
        const attributes = [nickname, birthData, phonenumber, empresaId];

        userPool.signUp(username, password, attributes, null, (error, result) => {

            if (error) {console.log(error);
            } else {console.log(result); }

        });

    }

    signIn(username: string, password: string) {

        Observable.create(observer => {

            const returnedUser: UserData = {
                username: null, fullname: null, alias: null,
                birthdate: null, phonenumber: null, empresaId: null, token: null };

            const authenticationData = { Username : username, Password : password };

            const authenticationDetails = new AuthenticationDetails(authenticationData);
            const userPool: CognitoUserPool = new CognitoUserPool(this.poolData);
            const userData = { Username : username, Pool : userPool };

            const cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {

                onSuccess: function (result) {

                    returnedUser.token = result.getAccessToken().getJwtToken();

                    cognitoUser.getUserAttributes((error, attributes) => {

                        returnedUser.alias = attributes['nickname'];
                        returnedUser.username = attributes['username'];
                        returnedUser.birthdate = attributes['birthDate'];
                        returnedUser.phonenumber = attributes['phone_number'];
                        returnedUser.empresaId = attributes['custom:empresaId'];

                        observer.next(returnedUser);
                        observer.complete();

                    });

                },

                onFailure: function(err) {observer.error(err); },

                newPasswordRequired: function(atributes, required) {

                },

                mfaRequired: function(challengeNames, challengeParameters) {

                }

            });

        });

    }

}
