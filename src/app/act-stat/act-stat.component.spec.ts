/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActStatComponent } from './act-stat.component';

describe('ActStatComponent', () => {
  let component: ActStatComponent;
  let fixture: ComponentFixture<ActStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
