import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password.component';
import { LoadSpinnerComponent } from './load-spinner.component';
import { MfaConfirmationComponent } from './mfa-confirmation.component';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule ],
  declarations: [ LoginComponent, SignupComponent, NewPasswordComponent, LoadSpinnerComponent, MfaConfirmationComponent ]
})
export class AuthModule { }
