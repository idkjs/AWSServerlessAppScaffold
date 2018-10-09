import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ CommonModule, PageHeaderModule ],
  declarations: [ProfileComponent]
})
export class UtilsModule { }
