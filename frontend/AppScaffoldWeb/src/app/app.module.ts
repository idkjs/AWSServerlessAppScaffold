import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Providers
import { AuthService } from './auth/auth.service';

// Application Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth.routing.module';

// Application Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './navigation/topbar/topbar.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, TopbarComponent, SidebarComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, SharedModule,
    AppRoutingModule, AuthModule, AuthRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
