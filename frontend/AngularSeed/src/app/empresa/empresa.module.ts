import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { EmpresaRoutingModule } from './empresa-routing.module';

import { EmpresaHomeComponent } from './home/empresa-home.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresaService } from './empresa.service';

const _imports = [ CommonModule, EmpresaRoutingModule, PageHeaderModule ];
const _declarations = [EmpresaHomeComponent, EmpresaComponent];
const _providers = [EmpresaService];

@NgModule({ imports: _imports, declarations: _declarations, providers: _providers})
export class EmpresaModule { }
