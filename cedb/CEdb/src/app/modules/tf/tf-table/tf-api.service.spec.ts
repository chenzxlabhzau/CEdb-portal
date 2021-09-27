import { TestBed } from '@angular/core/testing';

import { TfApiService } from './tf-api.service';

describe('TfApiService', () => {
  let service: TfApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
