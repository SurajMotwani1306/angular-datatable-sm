import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDatatableSmComponent } from './angular-datatable-sm.component';

describe('AngularDatatableSmComponent', () => {
  let component: AngularDatatableSmComponent;
  let fixture: ComponentFixture<AngularDatatableSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularDatatableSmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularDatatableSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
