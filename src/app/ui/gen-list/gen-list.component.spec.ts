/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenListComponent } from './gen-list.component';

describe('GenListComponent', () => {
  let component: GenListComponent;
  let fixture: ComponentFixture<GenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
