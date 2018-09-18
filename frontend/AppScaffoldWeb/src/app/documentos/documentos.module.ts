import { NgModule } from '@angular/core';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentoComponent } from './documento/documento.component';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ SharedModule, DocumentosRoutingModule ],
  declarations: [DocumentosComponent, DocumentoComponent]
})
export class DocumentosModule { }
