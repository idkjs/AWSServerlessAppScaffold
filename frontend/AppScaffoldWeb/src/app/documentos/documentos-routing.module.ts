import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentoComponent } from './documento/documento.component';

const routes: Routes = [
    {path: '', component: DocumentosComponent},
    {path: 'documento', component: DocumentoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentosRoutingModule {}
