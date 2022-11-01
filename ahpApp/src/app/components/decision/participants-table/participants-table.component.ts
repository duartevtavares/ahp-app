import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'John Mcnroe' },
  { name: 'John Oliver' },
];

@Component({
  selector: 'participants-table-component',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss'],
})
export class ParticipantsTableComponent {
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;
}
