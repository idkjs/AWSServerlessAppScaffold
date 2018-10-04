import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { PessoaRoutingModule } from './pessoa-routing.module';

import { PessoaHomeComponent } from './home/pessoa-home.component';

@NgModule({
  imports: [ CommonModule, PessoaRoutingModule, PageHeaderModule],
  declarations: [PessoaHomeComponent]
})
export class PessoaModule { }
