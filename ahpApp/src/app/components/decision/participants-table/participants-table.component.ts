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
  participantsSelected: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private participantsService: DecisionSpecificationsService
  ) {}

  ngOnInit() {
    this.participantsSelected = false;
    this.getParticipants();

    // this.apiService
    //   .getSpecificDecisionAlternatives(1)
    //   .subscribe((result) => console.log(result));

    // this.apiService
    //   .getSpecificDecisionCriteria(1)
    //   .subscribe((result) => console.log(result));

    // this.apiService
    //   .getSpecificDecisionParticipants(1)
    //   .subscribe((result) => console.log(result));

    // this.apiService
    //   .getSpecificDecision(1)
    //   .subscribe((result) => console.log(result));
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
        this.participantsSelected = true;
      });
  }
}
