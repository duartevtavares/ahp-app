import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'participants-table-component',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss'],
})
export class ParticipantsTableComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  participantName = [];

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getParticipants();
    this.getParticipant();
    this.postParticipant('');
  }

  postParticipant(name: string) {
    this.service.postParticipant('jose');
  }

  getParticipant() {
    this.service.getSpecificParticipant(3).subscribe((response) => {
      console.log('resposta: ', response);
    });
  }

  getParticipants() {
    this.service.getParticipants().subscribe(
      (response) => {
        console.log('resposta: ', response);
        this.participantName = response;
        console.log(this.participantName);
      },
      (error) => {
        console.log('erro', error);
      }
    );
  }
}
