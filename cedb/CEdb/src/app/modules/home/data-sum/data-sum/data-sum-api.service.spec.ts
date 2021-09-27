import { TestBed } from '@angular/core/testing';

import { DataSumApiService } from './data-sum-api.service';

describe('DataSumApiService', () => {
  let service: DataSumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
