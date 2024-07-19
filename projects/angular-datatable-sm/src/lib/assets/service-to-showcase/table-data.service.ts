import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  dataUrl = "<Load Table Data JSON File Path>";
  deleteUrl = "<Delete Table Data JSON File Path>";
  editUrl = "<Edit Table Data JSON File Path>";
  response: any;

  constructor(public http: HttpClient) {}

  getData(): Observable<any> {
    // Start Loader - You can add your loader here

    this.response = this.http.get<any>(this.dataUrl);
    this.dataUrl = "<Load Table Data JSON File Path>";
    if(this.response){
      // Stop Loader - You can add your loader here
    }
    return this.response;
  }

  deleteData(): Observable<any> {
    // Start Loader - You can add your loader here
    this.response = this.http.get<any>(this.deleteUrl);
    // Stop Loader - You can add your loader here
    return this.response;
  }

  editData(): Observable<any> {
    // Start Loader - You can add your loader here
    this.response = this.http.get<any>(this.editUrl);
    // Stop Loader - You can add your loader here
    return this.response;
  }
}
