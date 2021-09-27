import { TestBed } from '@angular/core/testing';

import { typicalApiService } from './typical-api.service';

describe('SearchApiService', () => {
  let service: typicalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(typicalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
