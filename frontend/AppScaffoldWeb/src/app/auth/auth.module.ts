import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [SignupComponent, LoginComponent, LogoutComponent],
    imports: [SharedModule],
    exports: []
})
export class AuthModule {}
