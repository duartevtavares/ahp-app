import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
export class ParticipantsTableComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;
  participantName: string | undefined;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getParticipants();
  }

  getParticipants() {
    this.service.getParticipants().subscribe(
      (response) => {
        console.log('resposta: ', response);
      },
      (error) => {
        console.log('erro', error);
      }
    );
  }
}
