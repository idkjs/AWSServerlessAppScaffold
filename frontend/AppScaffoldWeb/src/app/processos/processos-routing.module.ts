import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessosComponent } from './processos/processos.component';
import { ProcessoComponent } from './processo/processo.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { AtividadeComponent } from './atividade/atividade.component';

const routes: Routes = [
    {path: '', component: ProcessosComponent},
    {path: 'processo', component: ProcessoComponent},
    {path: 'atividades', component: AtividadesComponent},
    {path: 'atividade', component: AtividadeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessosRoutingModule {}
