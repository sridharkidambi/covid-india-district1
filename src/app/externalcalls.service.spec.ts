import { TestBed } from '@angular/core/testing';

import { ExternalcallsService } from './externalcalls.service';

describe('ExternalcallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalcallsService = TestBed.get(ExternalcallsService);
    expect(service).toBeTruthy();
  });
});
