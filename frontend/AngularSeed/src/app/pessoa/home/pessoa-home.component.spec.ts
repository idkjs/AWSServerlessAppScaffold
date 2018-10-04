import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaHomeComponent } from './pessoa-home.component';

describe('PessoaHomeComponent', () => {
  let component: PessoaHomeComponent;
  let fixture: ComponentFixture<PessoaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
