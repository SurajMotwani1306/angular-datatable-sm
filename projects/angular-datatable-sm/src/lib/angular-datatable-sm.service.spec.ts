import { TestBed } from '@angular/core/testing';

import { AngularDatatableSmService } from './angular-datatable-sm.service';

describe('AngularDatatableSmService', () => {
  let service: AngularDatatableSmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDatatableSmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
