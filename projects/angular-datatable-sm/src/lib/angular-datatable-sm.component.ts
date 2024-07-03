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
  itemsPerPage: number =  5; // Number of items to display per page
  noOfPagesAvailable: number = 0;
  parentValues: any;
  dependentKeys: any;
  paginationSelectOption: Array<number> = [5,10,20,50,100];

  constructor(private exToCSV : ExportToCsvService){}

  ngOnInit(){
    this.people = this.data.entries;
    this.headings = this.data.headers;
    this.parentValues = this.data.permissions;
    this.dependentKeys = this.data.dependentKeys;

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
      this.filteredPeople = [...this.people]; // Reset filteredPeople if searchTerm is empty
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
    console.log(this.currentPage);
    console.log(startIndex);
    
    let endIndex = startIndex + this.itemsPerPage;
    console.log(endIndex);

    this.filteredPeople = this.people.slice(startIndex, endIndex);
    console.log(this.filteredPeople);

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
}
