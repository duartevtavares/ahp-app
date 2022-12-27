import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantsDialogComponent } from './participants-dialog/participants-dialog.component';

export interface Participant {
  name: string;
}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'decision-component',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss'],
})
export class DecisionComponent {
  constructor(public dialog: MatDialog) {}
  name!: string;
}
