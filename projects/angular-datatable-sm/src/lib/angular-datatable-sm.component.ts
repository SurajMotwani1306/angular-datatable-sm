import { Component, Input } from '@angular/core';
import { ExportToCsvService } from './services/export-to-csv/export-to-csv.service';

@Component({
  selector: 'lib-angular-datatable-sm',
  templateUrl: './angular-datatable-sm.component.html',
  styleUrl: './angular-datatable-sm.component.css'
})
export class AngularDatatableSmComponent {
  
  @Input() data : any;
  people: any;
  headings: any;
  highlightedRow: any = null;
  sortedColumn: string = '';
  isAscending: boolean = true;
  searchTerm: string = '';
  filteredPeople: any;
  currentPage: number = 1;
  itemsPerPage: number =  5;
  noOfPagesAvailable: number = 0;
  parentValues: any;
  dependentKeys: any;
  paginationSelectOption: Array<number> = [5,10,20,50,100];
  extras: any;
  unSelectedStatus: boolean = false;
  replicaFilteredPeople: any;
  filterBoxArrowStatus: boolean = true;
  replicaOfHeading: any;

  constructor(private exToCSV : ExportToCsvService){}

  ngOnInit(){
    this.people = this.data.entries;
    this.headings = this.data.headers;
    this.extras = this.data.extras;
    this.parentValues = this.data.permissions;
    this.dependentKeys = this.data.dependentKeys;

    this.filterBoxArrowStatus = this.extras?.filterBoxArrowStatus;

    this.filteredPeople = [...this.people];
    this.filteredPeople.forEach((person:any) => person.showDetails = false);
    
    if(this.parentValues.pagination === true){
      this.updateFilteredData();
    }

    //Get input of items per page from object shared
    if(this.parentValues.pagination && this.dependentKeys.itemsPerPage){
      let valueContains = this.paginationSelectOption.includes(this.dependentKeys.itemsPerPage);
      if(!valueContains){
        this.paginationSelectOption.push(this.dependentKeys.itemsPerPage);
      }
      this.itemsPerPage = this.dependentKeys.itemsPerPage;
      this.paginationSelectOption.sort((a, b) => a - b);
      this.updateFilteredData();
    }

    this.noOfPages();

    //Creating replica to utilize it when filtered one gets altered
    this.replicaFilteredPeople = this.filteredPeople;

    this.methodToDisplayTableColumnsBasedOnParentCheck();
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
    if (!this.searchTerm) {
      this.filteredPeople = [...this.people];
    }else{
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredPeople = this.people.filter((person:any) =>
        person.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // this.updateFilteredData();
  }

  updateFilteredData() {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.filteredPeople = this.people.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateFilteredData();
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

  saveAccordion(index: number, updatedObj?:any) {
    this.filteredPeople[index].showDetails = !this.filteredPeople[index].showDetails;
  }

  updatedItemsPerPageCount(){
    this.updateFilteredData();
    this.noOfPages();
  }

  noOfPages(){
    this.noOfPagesAvailable = this.people.length / this.itemsPerPage;
  }

  uppercaseMethod(h: string){
    return h.toUpperCase().toString();
  }

  ceilNumber(num:number){
    return Math.ceil(num);
  }

  selectedColumnChange(event: any){
    // required when passed to parent more
    // console.log(event);
  }

  getStatusOfUnselectedAll(event: any){
      this.unSelectedStatus = event;
  }

  deleteRow(ID:number){
    // API Call for deleting row & get filtered data - No need to handle at frontend
    this.filteredPeople = this.filteredPeople.filter((obj: any) => obj.id !== ID);
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
}
