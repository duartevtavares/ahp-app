import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
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
    private api: ApiService
  ) {}

  myControl = new FormControl<string | DialogData>('');
  options: DialogData[] = [
    { name: 'John Stuart' },
    { name: 'Jeff Bezos' },
    { name: 'Igor Lound' },
  ];
  filteredOptions?: Observable<DialogData[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(participantName: DialogData): string {
    return participantName && participantName.name ? participantName.name : '';
  }

  private _filter(name: string): DialogData[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getParticipantName(participantName: any) {
    console.log(participantName);
    console.log(this.options);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}