import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneGlyphComponent } from './rune-glyph.component';

describe('RuneGlyphComponent', () => {
  let component: RuneGlyphComponent;
  let fixture: ComponentFixture<RuneGlyphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuneGlyphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuneGlyphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
