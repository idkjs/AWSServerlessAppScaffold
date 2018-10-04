import { PessoaModule } from './pessoa.module';

describe('PessoaModule', () => {
  let pessoaModule: PessoaModule;

  beforeEach(() => {
    pessoaModule = new PessoaModule();
  });

  it('should create an instance', () => {
    expect(pessoaModule).toBeTruthy();
  });
});
