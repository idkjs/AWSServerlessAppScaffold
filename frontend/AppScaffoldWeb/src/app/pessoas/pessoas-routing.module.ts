import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaComponent } from './pessoa/pessoa.component';
import { MensagensComponent } from './mensagens/mensagens.component';

const routes: Routes = [
    {path: '', component: PessoaComponent},
    {path: 'mensagem', component: MensagensComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoasRoutingModule {}
