import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentLinechartComponent } from './sentiment-linechart.component';

describe('SentimentLinechartComponent', () => {
  let component: SentimentLinechartComponent;
  let fixture: ComponentFixture<SentimentLinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentLinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
