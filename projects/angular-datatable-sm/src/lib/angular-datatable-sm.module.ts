import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularDatatableSmComponent } from './angular-datatable-sm.component';
import { EditRowComponent } from './components/edit-row/edit-row.component';


@NgModule({
  declarations: [
    AngularDatatableSmComponent,
    EditRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    AngularDatatableSmComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AngularDatatableSmModule { }
