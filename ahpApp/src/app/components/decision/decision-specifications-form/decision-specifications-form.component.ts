import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AlertComponent } from '../../shared/alert-component/alert-component.component';

@Component({
  selector: 'decision-specifications-form-component',
  templateUrl: './decision-specifications-form.component.html',
  styleUrls: ['./decision-specifications-form.component.scss'],
})
export class DecisionSpecificationsFormComponent {
  decisionSpecificationsForm = this.fb.group({
    problemGoal: new FormControl('', Validators.required),
    alternatives: this.fb.array([this.fb.control('', Validators.required)]),
    criteria: this.fb.array([this.fb.control('', Validators.required)]),
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  openDialog() {
    this.dialog.open(AlertComponent);
  }

  onSubmit() {
    console.log(this.decisionSpecificationsForm.value);
    if (this.alternatives.value[this.alternatives.value.length - 1] === '') {
      this.alternatives.removeAt(this.alternatives.value.length - 1);
    }
    if (this.criteria.value[this.criteria.value.length - 1] === '') {
      this.criteria.removeAt(this.criteria.value.length - 1);
    }

    console.log(this.decisionSpecificationsForm.value);

    // let data = this.decisionSpecificationsForm.value;
    // return this.http
    //   .post<any>('http://localhost:3000/availableParticipants', data)
    //   .pipe(
    //     map((res: any) => {
    //       return res;
    //     })
    //   );
  }

  get criteria() {
    return this.decisionSpecificationsForm.get('criteria') as FormArray;
  }

  get alternatives() {
    return this.decisionSpecificationsForm.get('alternatives') as FormArray;
  }

  addAlternatives(index: number) {
    console.log(index);
    if (this.alternatives.value[index - 1] != '') {
      this.alternatives.push(this.fb.control(''));
    } else {
      console.log('First fill the first alternative');
    }
  }

  addCriteria(index: number) {
    console.log(index);
    if (this.criteria.value[index - 1] != '') {
      this.criteria.push(this.fb.control(''));
    } else {
      console.log('First preenche o primeiro');
    }
  }

  deleteAlternative(index: number) {
    this.alternatives.removeAt(index);
  }

  deleteCriteria(index: number) {
    this.criteria.removeAt(index);
  }
}
