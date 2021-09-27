import { TestBed } from '@angular/core/testing';

import { SuperApiService } from './super-api.service';

describe('SearchApiService', () => {
  let service: SuperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
