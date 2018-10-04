import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { DocumentoRoutingModule } from './documento-routing.module';

import { DocumentoHomeComponent } from './home/documento-home.component';

@NgModule({
  imports: [ CommonModule, PageHeaderModule, DocumentoRoutingModule ],
  declarations: [DocumentoHomeComponent]
})
export class DocumentoModule { }
