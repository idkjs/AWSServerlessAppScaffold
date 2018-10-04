import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaHomeComponent } from './home/pessoa-home.component';

const routes: Routes = [
    {
        path: '',
        component: PessoaHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoaRoutingModule {}
