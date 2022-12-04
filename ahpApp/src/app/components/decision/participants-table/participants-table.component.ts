import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';

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
  }

  getParticipants() {
    this.service.getParticipants().subscribe(
      (response) => {
        this.participantName = response;
      },
      (error) => {
        console.log('erro', error);
      }
    );
  }
}
