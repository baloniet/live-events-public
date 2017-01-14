/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersStatComponent } from './members-stat.component';

describe('MembersStatComponent', () => {
  let component: MembersStatComponent;
  let fixture: ComponentFixture<MembersStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
