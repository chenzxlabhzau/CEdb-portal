import { TestBed } from '@angular/core/testing';

import { EnhancerApiService } from './enhancer-api.service';

describe('EnhancerApiService', () => {
  let service: EnhancerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnhancerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
