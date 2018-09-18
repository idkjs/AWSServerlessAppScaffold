import { NgModule } from '@angular/core';
import { PessoaComponent } from './pessoa/pessoa.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  imports: [ SharedModule, PessoasRoutingModule ],
  declarations: [PessoaComponent, MensagensComponent]
})
export class PessoasModule { }
