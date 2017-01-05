/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KindFormComponent } from './kind-form.component';

describe('KindFormComponent', () => {
  let component: KindFormComponent;
  let fixture: ComponentFixture<KindFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
