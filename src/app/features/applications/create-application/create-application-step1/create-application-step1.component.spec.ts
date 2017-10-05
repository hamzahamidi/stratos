import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplicationStep1Component } from './create-application-step1.component';

describe('CreateApplicationStep1Component', () => {
  let component: CreateApplicationStep1Component;
  let fixture: ComponentFixture<CreateApplicationStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApplicationStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApplicationStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});