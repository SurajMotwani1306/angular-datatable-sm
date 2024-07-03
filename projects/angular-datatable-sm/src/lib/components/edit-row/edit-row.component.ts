import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrl: './edit-row.component.css'
})
export class EditRowComponent {

  @Input() rowData: any;
}
