import { TestBed } from '@angular/core/testing';

import { StatisticsAdminService } from './statistics-admin.service';

describe('StatisticsAdminService', () => {
  let service: StatisticsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
