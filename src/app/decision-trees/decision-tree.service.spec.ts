import { TestBed } from '@angular/core/testing';

import { DecisionTreeService } from './decision-tree.service';

describe('DecisionTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecisionTreeService = TestBed.get(DecisionTreeService);
    expect(service).toBeTruthy();
  });
});
