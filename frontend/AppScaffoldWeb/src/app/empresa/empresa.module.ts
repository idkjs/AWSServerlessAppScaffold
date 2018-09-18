import { NgModule } from '@angular/core';
import { EmpresaComponent } from './empresa/empresa.component';
import { SharedModule } from '../shared/shared.module';
import { EmpresaRoutingModule } from './empresa-routing.module';

@NgModule({
  imports: [ SharedModule, EmpresaRoutingModule ],
  declarations: [EmpresaComponent]
})
export class EmpresaModule { }
