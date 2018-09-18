import { ProcessosModule } from './processos.module';

describe('ProcessosModule', () => {
  let processosModule: ProcessosModule;

  beforeEach(() => {
    processosModule = new ProcessosModule();
  });

  it('should create an instance', () => {
    expect(processosModule).toBeTruthy();
  });
});
