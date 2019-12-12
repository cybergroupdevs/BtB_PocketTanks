import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {Component, DebugElement} from "@angular/core";
import {ComponentFixture} from '@angular/core/testing';



describe('AppComponent', () => {

    

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));

  it("check if email is empty", async (()=>{

    
    

  }))






});


describe(' Login Component', ()=>{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });

    fixture = TestBed.createComponent(LoginComponent);
    

  }));

  it('check add', () => {
    const a = new AppComponent();
    expect(22).toEqual(a.add(10, 12));
  })

  
 it('email id is blank', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const email= fixture.debugElement.componentInstance;
  }));
  
    

 

});


