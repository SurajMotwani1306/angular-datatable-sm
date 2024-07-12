import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  dataUrl = "http://__url__/data";
  deleteUrl = "http://__url__/data/delete";
  editUrl = "http://__url__/data/edit";
  response: any;

  constructor(public http: HttpClient) {}

  getData(obj: any): Observable<any> {
    // Start Loader - You can add your loader here

    //Object Recieved - You need need to add obj <Line 22 - Line 26>, Just an instance to showcase what you recieve
    // obj = {
    //   currentPage: 1,    //Optional
    //   itemsPerPage: 5,     //Optional
    //   search: 'Search_text'  //Optional
    // }

    if(obj.hasOwnProperty('currentPage') && obj.hasOwnProperty('itemsPerPage') && obj.hasOwnProperty('search')){
      this.dataUrl = `${this.dataUrl}?searchText=${obj.search}&pageNumber=${obj.currentPage}&itemsPerPage=${obj.itemsPerPage}`;
    }else if(!obj.hasOwnProperty('currentPage') && !obj.hasOwnProperty('itemsPerPage') && obj.hasOwnProperty('search')){
      this.dataUrl = `${this.dataUrl}?searchText=${obj.search}`;
    }else if(obj.hasOwnProperty('currentPage') && obj.hasOwnProperty('itemsPerPage') && !obj.hasOwnProperty('search')){
      this.dataUrl = `${this.dataUrl}?pageNumber=${obj.currentPage}&itemsPerPage=${obj.itemsPerPage}`;
    }else{
      this.dataUrl = `${this.dataUrl}`;
    }

    this.response = this.http.get<any>(this.dataUrl);
    this.dataUrl = "http://__url__/data";
    if(this.response){
      // Stop Loader - You can add your loader here
    }
    return this.response;
  }

  deleteData(id: number): Observable<any> {
    //Recieved 'id' is the 'entries.id', row you want to delete

    // Start Loader - You can add your loader here
    this.response = this.http.delete<any>(this.deleteUrl+'/'+id);
    // Stop Loader - You can add your loader here
    return this.response;
  }

  editData(toUpdateIdData:number, data: any): Observable<any> {
    //Recieved 'toUpdateIdData' is the 'entries.id', row you want to update
    //"data" - full row data with updated text in edit row - "entries" row (All fields/object properties in a row), you have editted

    // Start Loader - You can add your loader here
    this.response = this.http.post<any>(this.editUrl+'/'+toUpdateIdData, data);
    // Stop Loader - You can add your loader here
    return this.response;
  }
}
