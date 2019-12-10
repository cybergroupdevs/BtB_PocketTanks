import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDialogComponent } from './tweet-dialog.component';

describe('TweetDialogComponent', () => {
  let component: TweetDialogComponent;
  let fixture: ComponentFixture<TweetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
