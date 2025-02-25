import { TestBed } from '@angular/core/testing';

import { GetWeatherServiceService } from './get-weather-service.service';

describe('GetWeatherServiceService', () => {
  let service: GetWeatherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWeatherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
