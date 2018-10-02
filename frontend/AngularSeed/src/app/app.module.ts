import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopbarComponent } from './navigation/topbar/topbar.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HomeComponent } from './navigation/home/home.component';
import { AwsCognito } from './providers/aws-cognito';
import { AuthService } from './services/auth-service';
import { LoginComponent } from './navigation/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [ BrowserModule, FormsModule ],
  providers: [ {provide: 'AUTH_PROVIDER',  useValue: new AwsCognito()}, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// // used to create fake backend
// import { fakeBackendProvider } from './providers/fake-backend';
// import { AlertService, AuthenticationService, UserService } from './services';
// import { JwtInterceptor, ErrorInterceptor } from './interceptors';

// import { routing } from './app.routing';
// import { AuthGuard } from './routing/auth.guard';

// import { AppComponent } from './app.component';
// import { HomeComponent, LoginComponent, RegisterComponent, AlertComponent } from './navigation';

// @NgModule({
//     imports: [
//         BrowserModule,
//         FormsModule,
//         HttpClientModule,
//         routing
//     ],
//     declarations: [
//         AppComponent,
//         HomeComponent,
//         LoginComponent,
//         RegisterComponent,
//         AlertComponent
//     ],
//     providers: [
//         { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
//         { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

//         // provider used to create fake backend
//         fakeBackendProvider,
//         AuthGuard,
//         AlertService,
//         AuthenticationService,
//         UserService
//     ],
//     bootstrap: [AppComponent]
// })

// export class AppModule { }
