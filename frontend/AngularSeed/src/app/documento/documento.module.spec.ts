import { DocumentoModule } from './documento.module';

describe('DocumentoModule', () => {
  let documentoModule: DocumentoModule;

  beforeEach(() => {
    documentoModule = new DocumentoModule();
  });

  it('should create an instance', () => {
    expect(documentoModule).toBeTruthy();
  });
});
