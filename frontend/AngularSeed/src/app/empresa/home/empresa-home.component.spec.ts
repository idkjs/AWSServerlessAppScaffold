import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaHomeComponent } from './empresa-home.component';

describe('EmpresaHomeComponent', () => {
  let component: EmpresaHomeComponent;
  let fixture: ComponentFixture<EmpresaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
