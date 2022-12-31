import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
import { DialogData } from '../decision.component';

@Component({
  selector: 'participants-dialog-component',
  templateUrl: './participants-dialog.component.html',
  styleUrls: ['./participants-dialog.component.scss'],
})
export class ParticipantsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ParticipantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService,
    private specsService: DecisionSpecificationsService
  ) {}

  myControl = new FormControl('');
  options: any = [];
  optionsNames: string[] = [];
  filteredOptions?: Observable<any>;

  ngOnInit() {
    this.apiService.getUsers().subscribe(
      (response) => {
        this.options = response;
        console.log(this.options);
      },
      (error) => {
        console.log('erro', error);
      }
    );
  }

  postParticipant() {
    console.log(this.myControl.value);
    this.specsService.participants = this.myControl.value;

    for (let i = 0; i < this.specsService.participants.length; i++) {
      this.specsService.participantsNames[i] =
        this.specsService.participants[i].name;
    }
    console.log(this.specsService.participantsNames);
    this.apiService.getParticipants().subscribe();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
