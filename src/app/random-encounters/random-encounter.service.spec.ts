import { TestBed } from '@angular/core/testing';

import { RandomEncounterService } from './random-encounter.service';

describe('RandomEncounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomEncounterService = TestBed.get(RandomEncounterService);
    expect(service).toBeTruthy();
  });
});
