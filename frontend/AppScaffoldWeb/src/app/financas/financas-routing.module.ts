import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultadosComponent } from './resultados/resultados.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { DespesasComponent } from './despesas/despesas.component';

const routes: Routes = [
    {path: '', component: ResultadosComponent},
    {path: 'receitas', component: ReceitasComponent},
    {path: 'despesas', component: DespesasComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancasRoutingModule {}
