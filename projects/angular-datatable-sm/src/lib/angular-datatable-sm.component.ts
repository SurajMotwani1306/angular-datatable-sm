import { Component, Input } from '@angular/core';
import { ExportToCsvService } from './services/export-to-csv/export-to-csv.service';
import { TableData } from "./models/user.interface";

@Component({
  selector: 'lib-angular-datatable-sm',
  templateUrl: './angular-datatable-sm.component.html',
  styleUrl: './angular-datatable-sm.component.css'
})
export class AngularDatatableSmComponent {
  
  @Input() tableDataService : any;
  @Input() pagination : boolean = false;
  @Input() itemsPerPage : number = 0;
  data : TableData;
  people: any;
  headings: any;
  highlightedRow: any = null;
  sortedColumn: string = '';
  isAscending: boolean = true;
  searchTerm: string = '';
  filteredPeople: any;
  currentPage: number = 1;
  noOfPagesAvailable: number = 1;
  parentValues: any = {};
  dependentKeys: any;
  paginationSelectOption: Array<number> = [5,10,20,50,100];
  extras: any;
  unSelectedStatus: boolean = false;
  replicaFilteredPeople: any;
  filterBoxArrowStatus: boolean = true;
  replicaOfHeading: any;
  firstPageLoad: boolean = true;
  resultantRow: any[] = [];
  replicaHeadings: any;

  constructor(private exToCSV : ExportToCsvService){}
  
  ngOnInit(){   
    this.loadTableData();
  }

  updateWithLatestValues(){
    this.people = this.data.entries;
    this.headings = this.data.headers;
    this.extras = this.data.extras;
    this.parentValues = this.data.permissions;
    this.dependentKeys = this.data.dependentKeys;
    this.filterBoxArrowStatus = this.extras?.filterBoxArrowStatus;

    this.filteredPeople = [...this.people];   
    this.filteredPeople.forEach((person:any) => person.showDetails = false);
    
    // if(this.parentValues.pagination === true){
    //   this.updateFilteredData();
    // }

    //Get input of items per page from object shared in pagination dropdown
    if(this.pagination === true && this.itemsPerPage){
      let valueContains = this.paginationSelectOption.includes(parseInt(this.itemsPerPage.toString()));

      if(!valueContains){
        this.paginationSelectOption.push(this.itemsPerPage);
      }
      // this.itemsPerPage = this.dependentKeys.itemsPerPage;
      this.paginationSelectOption.sort((a, b) => a - b);
      // this.updateFilteredData();
    }

    this.noOfPages();

    //Creating replica to utilize it when filtered one gets altered
    this.replicaFilteredPeople = this.filteredPeople;
    this.replicaHeadings = this.headings;

    this.methodToDisplayTableColumnsBasedOnParentCheck();
  }

  loadTableData() {
    this.tableDataService.getData(this.objectToPassDataService()).subscribe((response: any) => {
      if(response && response.status === 200){
        this.data = response?.data;
        this.updateWithLatestValues();
      }
    }, (error: any) => {
      // Handle errors
      console.log(error);
    });
  }

  objectToPassDataService(){
    let lowerCaseSearchTerm = this.searchTerm;
    let obj = {};

    if(this.pagination === true && this.searchTerm !== ""){
      obj = {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        search: lowerCaseSearchTerm
      }
    }else if(this.pagination === false && this.searchTerm !== ""){
      obj = {
        search: lowerCaseSearchTerm
      }
    }else if(this.pagination === true && this.searchTerm === ""){
      obj = {
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage
      }
    }else{
      obj = {}
    }

    return obj;
  }

  methodToDisplayTableColumnsBasedOnParentCheck(){
    this.replicaOfHeading = this.headings;
    if(this.parentValues.filterTableHeadersVisibility === false){
      this.headings.forEach((item:any, index: number) => {
        this.headings[index].checked = true;
      });
    }else{
      this.headings = this.replicaOfHeading;
    }
  }

  sort(column: string) {
    if (column === this.sortedColumn) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.filteredPeople.sort((a:any, b:any) => {
      const firstValue = a[column];
      const secondValue = b[column];

      if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        return this.isAscending ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
      } else {
        return this.isAscending ? firstValue - secondValue : secondValue - firstValue;
      }
    });

    // this.updateFilteredData();
  }

  search() {
    // this.filteredPeople = this.people.filter((person:any) =>
    //   person.name.toLowerCase().includes(lowerCaseSearchTerm) ||
    //   person.email.toLowerCase().includes(lowerCaseSearchTerm)
    // );

    this.tableDataService.getData(this.objectToPassDataService()).subscribe((response: any) => {
      if(response && response.status === 200){
        this.data = response?.data;
        this.updateWithLatestValues();
      }
    }, (error: any) => {
      // Handle errors
      console.log(error);
    });
    // this.updateFilteredData();
  }

  // updateFilteredData() {
  //   let startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   let endIndex = startIndex + this.itemsPerPage;
  //   this.filteredPeople = this.people.slice(startIndex, endIndex);
  // }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    // this.updateFilteredData();
    this.loadTableData();
  }

  exportToCsv() {
    this.exToCSV.exportToCsv(this.filteredPeople);
  }

  highlightRow(person: any) {
    this.highlightedRow = person;

    let setClassValue = document.getElementById(`row_${person.id}`);
    let setClassValue2 = document.getElementById(`row_expanded_${person.id}`);

    if(person.showDetails){
      if(setClassValue){
        setClassValue.classList.add("un-highlight-row");
      }

      if(setClassValue2){
        setClassValue2.classList.add("un-highlight-row-expanded");
      }
    }
  }

  clearHighlight(person: any) {
    if (this.highlightedRow === person) {
      this.highlightedRow = null;
    }
  }

  editAccordion(index: number) {
    this.closeAllOpenedEditAccordionsFirst();
    this.filteredPeople[index].showDetails = !this.filteredPeople[index].showDetails;
  }

  closeAllOpenedEditAccordionsFirst(){
    this.filteredPeople.forEach((element:any) => {
      element.showDetails = false;
    });
  }

  saveAccordion(index:number, rowData:any) {
    this.filteredPeople[index].showDetails = !this.filteredPeople[index].showDetails;
    this.resultantRow.forEach(element => {
      if(Object.hasOwn(rowData, element.name)){
        rowData[element.name] = element.value;
      }
    });

    let toUpdateIdData = rowData.id;
    delete rowData.showDetails;
    delete rowData.id;
    delete rowData._id;

    this.tableDataService.editData(toUpdateIdData,rowData).subscribe((response: any) => {
      if(response && response.status === 200){
        console.log(response.message);
        this.loadTableData();
      }
    }, (error: any) => {
      // Handle errors
      console.log(error);
    });
  }

  closeAccordion(index:number){
    this.filteredPeople[index].showDetails = !this.filteredPeople[index].showDetails;
    this.resultantRow = [];
  }

  updatedItemsPerPageCount(){
    // this.updateFilteredData();
    this.currentPage = 1;
    this.loadTableData();
    this.noOfPages();
  }

  noOfPages(){
    // this.noOfPagesAvailable = this.people.length / this.itemsPerPage;

    if(this.dependentKeys?.totalNumberOfPages){
      this.noOfPagesAvailable = this.dependentKeys?.totalNumberOfPages;
    }
  }

  selectedColumnChange(event: any){
    // required when passed to parent more   
    this.headings.filter((obj: any, index: number) => {
      if (obj['id'] === event['id']) {
        this.headings[index].checked = event.checked;
      }
    });
  }

  getStatusOfUnselectedAll(event: any){
      this.unSelectedStatus = event;
  }

  deleteRow(ID:number){
    // this.filteredPeople = this.filteredPeople.filter((obj: any) => obj.id !== ID);

    this.tableDataService.deleteData(ID).subscribe((response: any) => {
      if(response && response.status === 200){
        console.log(response.message);
        this.loadTableData();
      }
    }, (error: any) => {
      // Handle errors
      console.log(error);
    });
  }

  selectedColumnChange2(event: any){
    // required when passed to parent more
    let keysName = Object.keys(event);
    
    if(event[keysName[1]] === true){
      let result = this.replicaFilteredPeople.filter((obj: any) => obj[keysName[0]] === event[keysName[0]]);
      result.forEach((element:any) => {
        this.filteredPeople.push(element);
        this.filteredPeople.sort((a: any, b: any) => a.id - b.id)
      });
      
    }else{
      this.filteredPeople = this.filteredPeople.filter((obj: any) => obj[keysName[0]] !== event[keysName[0]]);
    }

    this.checkForDuplicationOfItems();
  }

  getStatusOfUnselectedAll2(event: any){
    if(event === false){
      this.filteredPeople = this.replicaFilteredPeople;
    }else{
      this.filteredPeople = [];
    }
    this.checkForDuplicationOfItems();
  }

  checkForDuplicationOfItems(){
    this.filteredPeople = this.filteredPeople.filter((data: any, index: number) => data.id !== (this.filteredPeople[index + 1]?.id));
  }

  updateFilterBoxArrowStatus(){
    this.filterBoxArrowStatus = !this.filterBoxArrowStatus;
  }

  updatedEditFieldValue(event: any){
    let flag = false;
    let key = -1;

    this.resultantRow.forEach((element, i) => {     
      if(element['index'] === event.index){
        flag = true;
        key = i;
      }      
    });

    if(flag){
      if(key >= 0){       
        this.resultantRow[key].value = event.value;
      }
    }else{
      this.resultantRow.push({index: event.index, name: event.name, value: event.value});
    }
  }
}
