import { NgModule } from '@angular/core';
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { SharedModule } from '../shared/shared.module';
import { FinancasRoutingModule } from './financas-routing.module';

@NgModule({
  imports: [ SharedModule, FinancasRoutingModule ],
  declarations: [DespesasComponent, ReceitasComponent, ResultadosComponent]
})
export class FinancasModule { }
