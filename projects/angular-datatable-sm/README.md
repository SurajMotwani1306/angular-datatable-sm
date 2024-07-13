# angular-datatable-sm
Dynamic Datatable SM generation based on your requirement i.e. Table heading with number of columns & its table data.
<br/>

<table>
  <tr>
    <td align="center">
      <img alt="React Native Stylish List"
        src="projects/angular-datatable-sm/src/lib/assets/Screeenshot/datatable.gif" />
    </td>
   </tr>
</table>

## Installation

```sh
npm i angular-datatable-sm
```

## Usage

## Import
### Step 1:
```ts
import { AngularDatatableSmModule } from 'angular-datatable-sm';

@NgModule({
  ...
  imports: [
    ...
    AngularDatatableSmModule
  ],
  ...
})
```

### Step 2:
Create a service file in your project & copy the template provided for your project - <a href="https://github.com/SurajMotwani1306/angular-datatable-sm/blob/main/projects/angular-datatable-sm/src/lib/services/tableData/table-data.service.ts">table-data.service</a><br/>
& import it inside component where you want to use our "angular-datatable-sm" package:
```ts
import { TableDataService } from './services/tableData/table-data.service';

constructor(public tableDataService: TableDataService) { }
```

## Fundamental Usage
### Step 3:
Add in same component html file, where you have imported "TableDataService":

```html
<lib-angular-datatable-sm
  [pagination]="true"
  [itemsPerPage]="5"
  [tableDataService]="tableDataService">    <!-- Passing Service you have created-->
</lib-angular-datatable-sm>
```

## Fundamentals

| Property/Method  |  Type   |  Default  | Description                                                                            |
| ---------------- | :-----: | :-------: | -------------------------------------------------------------------------------------- |
| pagination       | boolean |   false   | Parent flag to showcase pagination for data table                                      |
| itemsPerPage     | number  |     10    | Mandatory field with "pagination" to show number of items per page                     |
| tableDataService | service |     -     | Service file having api calling methods & return observale which can subscribe further |


# Configuration - JSON/Object
### Step 4:
Values with dummy data is mentioned below, to recieve as required response:
Service file methods must return below format as response, to pass & "angular-datatable-sm" to work properly

```ts
let tableData = {
    headers: [
      { id: 1, name: 'id', checked: true },
      { id: 2, name: 'name', checked: true },
      { id: 3, name: 'age', checked: false },
      { id: 4, name: 'email', checked: true },
      { id: 4, name: 'progress', checked: true },
      { id: 4, name: 'emp_number', checked: false },
      { id: 4, name: 'ratings', checked: false },
    ],
    entries: [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', progress: 10, emp_number: '245', ratings: 4.5 },
      { id: 2, name: 'Jane Doe', age: 28, email: 'jane@example.com', progress: 50, emp_number: '246', ratings: 4 },
      { id: 3, name: 'Michael Smith', age: 35, email: 'michael@example.com', progress: 20, emp_number: '247', ratings: 1.5 },
      { id: 4, name: 'Emily Johnson', age: 25, email: 'emily@example.com', progress: 80, emp_number: '248', ratings: 2.25 },
      { id: 5, name: 'James Brown', age: 32, email: 'james@example.com', progress: 97, emp_number: '249', ratings: 3.58 },
      { id: 6, name: 'John Doe', age: 30, email: 'john@example.com', progress: 53, emp_number: '250', ratings: 3.50 },
      { id: 7, name: 'Jane Doe', age: 28, email: 'jane@example.com', progress: 91, emp_number: '251', ratings: 4 },
      { id: 8, name: 'Michael Smith', age: 35, email: 'michael@example.com', progress: 63, emp_number: '252', ratings: 4.5 },
      { id: 9, name: 'Emily Johnson', age: 25, email: 'emily@example.com', progress: 25, emp_number: '253', ratings: 4.85 },
      { id: 10, name: 'James Brown', age: 32, email: 'james@example.com', progress: 13, emp_number: '254', ratings: 5 }
    ],
    permissions: {
      searchVisibility: true,
      exportToCsvVisibility: true,
      filterTableHeadersVisibility: true,
      filterBtnTableContentVisibility: true,
      showcaseActionButtons: ['edit', 'delete']
    },
    dependentKeys: {
      progressColumn: 'progress',
      progressBarType: 'bar',
      ratingsColumn: 'ratings',
      filterColumn: 'name',
      maxRating: 5,
      editSaveActionButtonBgColor: '#007bff3b',
      deleteActionButtonBgColor: '#ff73003b',
      closeActionButtonBgColor: '#ff73003b'
    },
    extras: {
      uncheckAllStatus: false,
      dropdownButtonText: 'Table Columns',
      filterBoxArrowStatus: true
    }
  };
```

or you can try it with json file importing in your service file as well: <a href="https://github.com/SurajMotwani1306/angular-datatable-sm/blob/main/projects/angular-datatable-sm/src/lib/assets/json/data.json">JSON Link</a>

## Properties

| Property         |    Type    | Description                                                                              |
| ---------------- | :--------: | ---------------------------------------------------------------------------------------- |
| headers          | Arr of Obj | <b>"id", "name" & "checked" are mandatory fields required to showcase a table heading</b>|
| entries          | Arr of Obj | <b>Fields name should be exactly same to "header.name" value, to make table in sync</b>  |
| permissions      |   Object   | It contains parent properties mostly for visibility - Show/Hide                          |
| dependentKeys    |   Object   | It contains properties mostly dependent upon "permissions" properties                    |
| extras           |   Object   | It contains extra properties to update/handle                                            |

## Properties - Elaborated & Its dependencies on each other:
1. <b>permissions.searchVisibility:</b> 
  <br/>Show/Hide Search functionality on the top of the table.
  <br/>Dependent Properties: No

2. <b>permissions.exportToCsvVisibility:</b>
  <br/> Show/Hide export to csv button.
  <br/>Dependent Properties: No

3. <b>permissions.filterTableHeadersVisibility:</b>
  <br/> Show/Hide filter for header button.
  <br/>Dependent Property 1: <b>"extras.dropdownButtonText"</b> - To update Dropdown Button text, otherwise default - "Table Columns"
  <br/>Dependent Property 2: <b>"extras.uncheckAllStatus"</b> - To maintain uncheck All status in overall Table for headers dropdown.

4. <b>permissions.filterBtnTableContentVisibility:</b>
  <br/> Show/Hide filter icon for column wise filteration.
  <br/>Dependent Properties: <b>"dependentKeys.filterColumn"</b> - To add column wise filter functionality to the table & mention particular field name from "entries" - Array of Object, likewise - "name".

5. <b>permissions.showcaseActionButtons:</b>
  <br/> Mention 'edit' to enable edit functionality & 'delete' to enable delete button in Array.
  <br/>Dependent Properties: <b>"dependentKeys.editSaveActionButtonBgColor", "dependentKeys.deleteActionButtonBgColor" & "dependentKeys.closeActionButtonBgColor"</b> - To add background colors to button, by default transparent.

6. <b>dependentKeys.progressColumn:</b>
  <br/> Mention column/property - exact field from "entries", to enable progressbar to particular column/field. It should be numeric value.
  <br/>Dependent Properties: <b>"dependentKeys.progressBarType"</b> - "bar" or "circle" to represent in such form.

7. <b>dependentKeys.ratingsColumn:</b>
  <br/> Mention column/property - exact field from "entries", to enable ratings to particular column/field (Gained ratings). It should be numeric value.
  <br/>Dependent Properties: <b>"dependentKeys.maxRating"</b> - Maximum Stars to represent.

8. <b>extras.filterBoxArrowStatus:</b>
  <br/> Show/Minimize Filter box at the top of the table, on load.
  <br/>Dependent Properties: No

## Author
You can contact me via. mail for any modiciations/updations for this package.
<br/>
Suraj Motwani - Email: suraj.motwani1306@gmail.com

## License

Dynamic Datatable SM is available under the MIT license. See the LICENSE file for more info.

