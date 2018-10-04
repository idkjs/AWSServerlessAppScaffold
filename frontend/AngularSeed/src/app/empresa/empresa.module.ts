import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { EmpresaRoutingModule } from './empresa-routing.module';

import { EmpresaHomeComponent } from './home/empresa-home.component';

@NgModule({
  imports: [ CommonModule, EmpresaRoutingModule, PageHeaderModule],
  declarations: [EmpresaHomeComponent]
})
export class EmpresaModule { }
