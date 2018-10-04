import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoHomeComponent } from './home/documento-home.component';

const routes: Routes = [
    {
        path: '',
        component: DocumentoHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentoRoutingModule {}
