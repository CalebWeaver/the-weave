import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellInputComponent } from './spell-input.component';

describe('SpellInputComponent', () => {
  let component: SpellInputComponent;
  let fixture: ComponentFixture<SpellInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
