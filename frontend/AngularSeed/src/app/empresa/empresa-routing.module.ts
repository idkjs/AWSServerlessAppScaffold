import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaHomeComponent } from './home/empresa-home.component';

const routes: Routes = [
    {
        path: '',
        component: EmpresaHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule {}
