import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { NewPasswordComponent } from './auth/new-password.component';
import { MfaConfirmationComponent } from './auth/mfa-confirmation.component';

const routes: Routes = [
    { path: '', loadChildren: './navigation/navigation.module#NavigationModule' },
    { path: 'layout', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'newpassword', component: NewPasswordComponent },
    { path: 'mfaconfirmation', component: MfaConfirmationComponent },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
