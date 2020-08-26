import { TestBed } from '@angular/core/testing';

import { CastingService } from './casting.service';
import {Spell} from '../classes/spell';

describe('CastingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CastingService = TestBed.get(CastingService);
    expect(service).toBeTruthy();
  });

  it('should be valid', () => {
    const validSpell = '⏅⏣⎧⏄⏂⎧⎧⎧⏁';
    const service: CastingService = TestBed.get(CastingService);
    expect(service.cast(new Spell(validSpell))).toBeTruthy();
  });
});
