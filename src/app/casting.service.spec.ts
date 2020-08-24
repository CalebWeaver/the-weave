import { TestBed } from '@angular/core/testing';

import { CastingService } from './casting.service';

describe('CastingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CastingService = TestBed.get(CastingService);
    expect(service).toBeTruthy();
  });
});
