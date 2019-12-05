import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountLoginComponent } from './social-account-login.component';

describe('SocialAccountLoginComponent', () => {
  let component: SocialAccountLoginComponent;
  let fixture: ComponentFixture<SocialAccountLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAccountLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
