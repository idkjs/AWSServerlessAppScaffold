import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoHomeComponent } from './documento-home.component';

describe('DocumentoHomeComponent', () => {
  let component: DocumentoHomeComponent;
  let fixture: ComponentFixture<DocumentoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
