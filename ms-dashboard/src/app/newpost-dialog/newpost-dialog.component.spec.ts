import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpostDialogComponent } from './newpost-dialog.component';

describe('NewpostDialogComponent', () => {
  let component: NewpostDialogComponent;
  let fixture: ComponentFixture<NewpostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
