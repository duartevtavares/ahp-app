import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';

@Component({
  selector: 'participants-table-component',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss'],
})
export class ParticipantsTableComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  participantNames!: MatTableDataSource<any>;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private participantsService: DecisionSpecificationsService
  ) {}

  ngOnInit() {
    this.getParticipants();
  }

  getParticipants() {
    this.participantNames = new MatTableDataSource(
      this.participantsService.participants
    );
    console.log(this.participantNames);

    // this.service.getParticipants().subscribe(
    //   (response) => {
    //     this.participantName = response;
    //   },
    //   (error) => {
    //     console.log('erro', error);
    //   }
    // );
  }

  openDialog() {
    this.dialog
      .open(ParticipantsDialogComponent, {
        data: { name: this.name },
      })
      .afterClosed()
      .subscribe((val) => {
        this.getParticipants();
      });
  }
}
