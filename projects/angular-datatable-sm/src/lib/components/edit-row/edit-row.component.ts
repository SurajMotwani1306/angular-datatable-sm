import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrl: './edit-row.component.css'
})
export class EditRowComponent {

  @Input() rowData: any;
  @Output() updatedText = new EventEmitter<{ index: number, name: string, 'value': any}>();

  ngOnInit(){}

  getchanged(){
    this.updatedText.emit({index: this.rowData.index, name: this.rowData.name, value: this.rowData.value });
  }
}
