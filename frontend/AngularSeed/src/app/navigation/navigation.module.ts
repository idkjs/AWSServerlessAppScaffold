import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationRoutingModule } from './navigation-routing.module';

import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [ CommonModule, NavigationRoutingModule , TranslateModule, NgbDropdownModule.forRoot() ],
  declarations: [TopBarComponent, SideBarComponent, HomeComponent, NavigationComponent]
})
export class NavigationModule { }
