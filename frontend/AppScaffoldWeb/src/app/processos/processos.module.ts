import { NgModule } from '@angular/core';
import { ProcessoComponent } from './processo/processo.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { ProcessosComponent } from './processos/processos.component';
import { SharedModule } from '../shared/shared.module';
import { ProcessosRoutingModule } from './processos-routing.module';

@NgModule({
  imports: [ SharedModule, ProcessosRoutingModule ],
  declarations: [ProcessoComponent, AtividadeComponent, AtividadesComponent, ProcessosComponent]
})
export class ProcessosModule { }
