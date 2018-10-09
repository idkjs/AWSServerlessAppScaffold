import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { NewPasswordComponent } from './new-password.component';
import { MfaConfirmationComponent } from './mfa-confirmation.component';
import { UserConfirmationComponent } from './user-confirmation.component';

const routes: Routes = [
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'newpassword/:username', component: NewPasswordComponent },
    { path: 'mfaconfirmation/:username', component: MfaConfirmationComponent },
    { path: 'userconfirmation/:username', component: UserConfirmationComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
