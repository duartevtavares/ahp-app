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
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
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

  decisionSpecifications: any;
  disabledAddButton = false;
  formSubmited = false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public specsService: DecisionSpecificationsService,
    private apiService: ApiService
  ) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  openDialog() {
    this.dialog.open(AlertComponent);
  }

  edit() {
    this.decisionSpecificationsForm.enable();
    this.disabledAddButton = false;
    this.formSubmited = false;
  }

  onSubmit() {
    if (this.alternatives.value[this.alternatives.value.length - 1] === '') {
      this.alternatives.removeAt(this.alternatives.value.length - 1);
    }
    if (this.criteria.value[this.criteria.value.length - 1] === '') {
      this.criteria.removeAt(this.criteria.value.length - 1);
    }
    this.decisionSpecificationsForm.disable();
    this.disabledAddButton = true;
    this.formSubmited = true;
    this.decisionSpecifications = this.decisionSpecificationsForm.value;
    this.specsService.decisionSpecs = this.decisionSpecifications;

    console.log(this.decisionSpecifications);
    console.log(this.specsService.participants);

    let decision = this.apiService.postDecision({
      name: this.decisionSpecifications.problemGoal,
      goal: this.decisionSpecifications.problemGoal,
    });
    this.apiService.getDecisions().subscribe((res) => {
      let decisionId = res.length + 1;
      for (let i = 0; i < this.specsService.participants.length; i++) {
        this.apiService.postSpecificDecisionParticipants({
          decisionId: decisionId,
          participantsId: this.specsService.participants[i].id,
          participantWeight: 99,
        });
      }
    });

    // let decision_id = this.apiService.postSpecificDecisionParticipants({
    //   name: this.decisionSpecifications.problemGoal,
    //   goal: this.decisionSpecifications.problemGoal,
    // });

    for (let i = 0; i < this.specsService.participants.length; i++) {
      console.log(this.specsService.participants[i].id);
    }
    // this.apiService.postSpecificDecisionParticipants({
    //   decisionId: decision_id,
    //   participantsId: this.specsService.participants[0].id,
    //   participantWeight: 99,
    // });
  }

  get criteria() {
    return this.decisionSpecificationsForm.get('criteria') as FormArray;
  }

  get alternatives() {
    return this.decisionSpecificationsForm.get('alternatives') as FormArray;
  }

  addAlternatives(index: number) {
    if (this.alternatives.value[index - 1] != '') {
      this.alternatives.push(this.fb.control(''));
    } else {
      console.log('First fill the first alternative');
    }
  }

  addCriteria(index: number) {
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
