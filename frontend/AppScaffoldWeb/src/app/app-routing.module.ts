import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'empresa', loadChildren: './empresa/empresa.module#EmpresaModule'},
    {path: 'pessoas', loadChildren: './pessoas/pessoas.module#PessoasModule'},
    {path: 'processos', loadChildren: './processos/processos.module#ProcessosModule'},
    {path: 'financas', loadChildren: './financas/financas.module#FinancasModule'},
    {path: 'documentos', loadChildren: './documentos/documentos.module#DocumentosModule'}
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {}
