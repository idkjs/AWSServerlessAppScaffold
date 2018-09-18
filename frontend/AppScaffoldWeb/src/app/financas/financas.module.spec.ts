import { FinancasModule } from './financas.module';

describe('FinancasModule', () => {
  let financasModule: FinancasModule;

  beforeEach(() => {
    financasModule = new FinancasModule();
  });

  it('should create an instance', () => {
    expect(financasModule).toBeTruthy();
  });
});
