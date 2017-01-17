/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeachStatComponent } from './teach-stat.component';

describe('TeachStatComponent', () => {
  let component: TeachStatComponent;
  let fixture: ComponentFixture<TeachStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
