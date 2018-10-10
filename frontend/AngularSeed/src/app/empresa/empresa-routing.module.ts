import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaHomeComponent } from './home/empresa-home.component';
import { EmpresaComponent } from './empresa/empresa.component';

const routes: Routes = [
    // { path: '', redirectTo: '/empresas', pathMatch: 'full'},
    { path: '', component: EmpresaHomeComponent},
    { path: ':empresaId', component: EmpresaComponent}
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class EmpresaRoutingModule {}
