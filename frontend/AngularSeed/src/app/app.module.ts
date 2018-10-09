import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule, AuthService, CognitoProvider } from './auth';
import { UtilsModule } from './utils';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [ CommonModule, BrowserModule, BrowserAnimationsModule,
        HttpClientModule, TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] } }),
        UtilsModule, AuthModule, AppRoutingModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        {provide: 'AUTH_PROVIDER',  useValue: new CognitoProvider() },
        {provide: 'HOME_ROUTE',  useValue: '' },
        AuthService
    ]
})
export class AppModule {}
