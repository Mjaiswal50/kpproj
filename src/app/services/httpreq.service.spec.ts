import { TestBed } from '@angular/core/testing';

import { HttpreqService } from './httpreq.service';

describe('HttpreqService', () => {
  let service: HttpreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
