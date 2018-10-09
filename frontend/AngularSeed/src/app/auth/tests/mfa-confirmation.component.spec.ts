import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaConfirmationComponent } from '../mfa-confirmation.component';

describe('MfaConfirmationComponent', () => {
  let component: MfaConfirmationComponent;
  let fixture: ComponentFixture<MfaConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfaConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfaConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
