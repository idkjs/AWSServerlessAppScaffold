import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password.component';
import { LoadSpinnerComponent } from './uihelpers/load-spinner.component';
import { MfaConfirmationComponent } from './mfa-confirmation.component';
import { UserConfirmationComponent } from './user-confirmation.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [ CommonModule, AuthRoutingModule, FormsModule ],
  declarations: [ LoginComponent, SignupComponent, NewPasswordComponent, LoadSpinnerComponent, MfaConfirmationComponent, UserConfirmationComponent ],
  providers: [AuthGuard]
})
export class AuthModule { }
