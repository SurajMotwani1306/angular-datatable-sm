import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportToCsvService {

  constructor() { }
  
  exportToCsv(filteredPeople: any) {
    const csvHeader = Object.keys(filteredPeople[0]).join(',');
    const csvData = filteredPeople.map((person:any) => Object.values(person).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}\n${csvData}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  }
}
