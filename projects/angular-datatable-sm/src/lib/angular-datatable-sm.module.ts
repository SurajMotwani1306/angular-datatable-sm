import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularDatatableSmComponent } from './angular-datatable-sm.component';

import { AngularDropdownSelectModule } from 'angular-dropdown-select';
import { AngularProgressBarSmModule } from 'angular-progress-bar-sm';
import { AngularRatingShowcaseModule } from 'angular-rating-showcase';
import { AngularFilterDropdownModule } from 'angular-filter-dropdown';


@NgModule({
  declarations: [
    AngularDatatableSmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularDropdownSelectModule,
    AngularRatingShowcaseModule,
    AngularFilterDropdownModule,
    AngularProgressBarSmModule
  ],
  exports: [
    AngularDatatableSmComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AngularDatatableSmModule { }
