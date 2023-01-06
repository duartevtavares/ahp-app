import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
import { AlertComponent } from '../../shared/alert-component/alert-component.component';

@Component({
  selector: 'decision-specifications-form-component',
  templateUrl: './decision-specifications-form.component.html',
  styleUrls: ['./decision-specifications-form.component.scss'],
})
export class DecisionSpecificationsFormComponent implements OnInit {
  decisionSpecificationsForm = this.fb.group({
    problemGoal: new FormControl('', Validators.required),
    alternatives: this.fb.array([this.fb.control('', Validators.required)]),
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

  myCriteriaControl = new FormControl('');
  criteriaOptions: any = [];
  criteriaOptionsNames: string[] = [];
  filteredOptions?: Observable<any>;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit() {
    this.apiService.getCriteria().subscribe(
      (response) => {
        this.criteriaOptions = response;
      },
      (error) => {
        console.log('erro', error);
      }
    );
  }

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
    // if (this.criteria.value[this.criteria.value.length - 1] === '') {
    //   this.criteria.removeAt(this.criteria.value.length - 1);
    // }
    this.decisionSpecificationsForm.disable();
    this.disabledAddButton = true;
    this.formSubmited = true;
    this.decisionSpecifications = this.decisionSpecificationsForm.value;
    this.specsService.decisionSpecs = this.decisionSpecifications;
    this.specsService.decisionCriteria = this.myCriteriaControl.value;
    this.specsService.decisionAlternativesNames =
      this.specsService.decisionSpecs.alternatives;

    console.log(this.decisionSpecifications);
    console.log(this.specsService.participants);
    console.log('criteria: ', this.specsService.decisionCriteria);
    console.log('alternatives: ', this.specsService.decisionAlternativesNames);

    //post decision specifications

    this.apiService
      .postDecision({
        name: this.decisionSpecifications.problemGoal,
        goal: this.decisionSpecifications.problemGoal,
      })
      .subscribe(() => {
        this.apiService.getDecisions().subscribe((res) => {
          let decisionId = res[res.length - 1].id;
          console.log(decisionId);
          for (let i = 0; i < this.specsService.participants.length; i++) {
            this.apiService.postSpecificDecisionParticipants({
              decisionId: decisionId,
              participantsId: this.specsService.participants[i].id,
              participantWeight: 99, //TODO: change this to a received value
            });
          }
          for (let i = 0; i < this.specsService.decisionCriteria.length; i++) {
            this.apiService.postSpecificDecisionCriteria({
              decisionId: decisionId,
              criteriaId: this.specsService.decisionCriteria[i].id,
            });
          }
          for (
            let i = 0;
            i < this.specsService.decisionAlternativesNames.length;
            i++
          ) {
            this.apiService.postSpecificDecisionAlternative({
              decisionId: decisionId,
              alternativeValue: 1,
              alternativeName: this.specsService.decisionAlternativesNames[i],
            });
          }
        });
      });

    for (let i = 0; i < this.specsService.participants.length; i++) {
      console.log(this.specsService.participants[i].id);
    }

    console.log(this.specsService.decisionSpecs.alternatives);
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

  // addCriteria(index: number) {
  //   if (this.criteria.value[index - 1] != '') {
  //     this.criteria.push(this.fb.control(''));
  //   } else {
  //     console.log('First preenche o primeiro');
  //   }
  // }

  deleteAlternative(index: number) {
    this.alternatives.removeAt(index);
  }

  // deleteCriteria(index: number) {
  //   this.criteria.removeAt(index);
  // }
}
