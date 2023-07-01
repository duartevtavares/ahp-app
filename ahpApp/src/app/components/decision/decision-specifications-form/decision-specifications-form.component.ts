import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, Observable, switchMap } from 'rxjs';
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

  decisionId: any;
  alternativesValues = new FormArray<any>([]);
  alternativesValuesCounter = 0;
  decisionSpecifications: any;
  disabledAddButton = false;
  formSubmited = false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public specsService: DecisionSpecificationsService,
    public apiService: ApiService
  ) {}

  myCriteriaControl = new FormControl('');
  criteriaOptions: any = [];
  criteriaOptionsNames: string[] = [];
  filteredOptions?: Observable<any>;
  alternativesIds: number[] = [];

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
    this.removeAlternativesValues();
  }

  onSubmit() {
    this.alternativesValuesCounter = 0;
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

    if (this.myCriteriaControl.value) {
      for (let j = 0; j < this.myCriteriaControl.value.length; j++) {
        for (let i = 0; i < this.alternatives.length; i++) {
          this.alternativesValuesCounter++;
          this.addAlternativesValues();
        }
      }
    }

    this.apiService.getDecisions().subscribe((res) => {
      this.decisionId = res.length + 1;
      console.log(res);
    });

    console.log('counter: ', this.alternativesValuesCounter);

    console.log(this.decisionSpecifications);
    console.log(this.specsService.decisionSpecs);
    console.log(this.specsService.participants);
    console.log('criteria: ', this.specsService.decisionCriteria);
    console.log('alternatives: ', this.specsService.decisionAlternativesNames);
  }

  onSubmit2() {
    //post decision specifications
    console.log(this.alternativesValues.value);
    if (this.myCriteriaControl.value) {
      for (let j = 0; j < this.myCriteriaControl.value.length; j++) {
        for (let i = 0; i < this.alternatives.length; i++) {
          console.log(
            this.alternativesValues.value[
              j * this.specsService.decisionAlternativesNames.length + i
            ]
          );
        }
      }
    }

    let alternativesObservable = this.apiService.postAlternative({
      name: this.specsService.decisionAlternativesNames[0],
    });
    for (
      let i = 1;
      i < this.specsService.decisionAlternativesNames.length;
      i++
    ) {
      alternativesObservable = alternativesObservable.pipe(
        concatMap(() =>
          this.apiService.postAlternative({
            name: this.specsService.decisionAlternativesNames[i],
          })
        )
      );
    }
    alternativesObservable.subscribe((res: any) => {
      console.log(res);
      let lastId = res[0].id;
      for (
        let i = 1;
        i <= this.specsService.decisionAlternativesNames.length;
        i++
      ) {
        this.alternativesIds.push(
          lastId - this.specsService.decisionAlternativesNames.length + i
        );
      }
    });

    // this.specsService.decisionAlternativesNames.forEach(
    //   (alternativeName: any) => {
    //     this.apiService
    //       .postAlternative({
    //         name: alternativeName,
    //       })
    //       .subscribe((res: any) => {
    //         this.alternativesIds.push(res[0].id);
    //       });
    //   }
    // );

    //////////////////////////////////

    this.apiService
      .postDecision({
        goal: this.decisionSpecifications.problemGoal,
        category: this.decisionSpecifications.problemGoal,
      })
      .subscribe();

    setTimeout(() => {
      let participantsObservable =
        this.apiService.postSpecificDecisionParticipants({
          decisionId: this.decisionId,
          participantsId: this.specsService.participants[0].id,
          participantWeight: 99, //TODO: change this to a received value
        });

      for (let i = 1; i < this.specsService.participants.length; i++) {
        participantsObservable = participantsObservable.pipe(
          concatMap(() =>
            this.apiService.postSpecificDecisionParticipants({
              decisionId: this.decisionId,
              participantsId: this.specsService.participants[i].id,
              participantWeight: 99, //TODO: change this to a received value
            })
          )
        );
      }
      participantsObservable.subscribe((res: any) => {
        console.log(res);
      });

      // for (let i = 0; i < this.specsService.decisionCriteria.length; i++) {
      //   this.apiService.postSpecificDecisionCriteria({
      //     decisionId: this.decisionId,
      //     criteriaId: this.specsService.decisionCriteria[i].id,
      //   });
      // }

      let criteriaObservable = this.apiService.postSpecificDecisionCriteria({
        decisionId: this.decisionId,
        criteriaId: this.specsService.decisionCriteria[0].id,
      });

      for (let i = 1; i < this.specsService.decisionCriteria.length; i++) {
        criteriaObservable = criteriaObservable.pipe(
          concatMap(() =>
            this.apiService.postSpecificDecisionCriteria({
              decisionId: this.decisionId,
              criteriaId: this.specsService.decisionCriteria[i].id,
            })
          )
        );
      }
      criteriaObservable.subscribe((res: any) => {
        console.log(res);
      });

      // for (
      //   let i = 0;
      //   i < this.specsService.decisionAlternativesNames.length;
      //   i++
      // ) {
      //   this.apiService.postSpecificDecisionAlternative({
      //     decisionId: this.decisionId,
      //     alternativeId: this.alternativesIds[i],
      //   });
      // }
      console.log(this.alternativesIds);
      let decisionAlternativesObservable =
        this.apiService.postSpecificDecisionAlternative({
          decisionId: this.decisionId,
          alternativeId: this.alternativesIds[0],
        });

      for (
        let i = 1;
        i < this.specsService.decisionAlternativesNames.length;
        i++
      ) {
        decisionAlternativesObservable = decisionAlternativesObservable.pipe(
          concatMap(() =>
            this.apiService.postSpecificDecisionAlternative({
              decisionId: this.decisionId,
              alternativeId: this.alternativesIds[i],
            })
          )
        );
      }
      decisionAlternativesObservable.subscribe((res: any) => {
        console.log(res);
      });

      let alternativeCriterionValueObservable =
        this.apiService.postSpecificDecisionAlternativesCriterionValue({
          decisionId: this.decisionId,
          alternativeId: this.alternativesIds[0],
          criterionId: this.specsService.decisionCriteria[0].id,
          alternativeCriterionValue:
            this.alternativesValues.value[
              0 * this.specsService.decisionAlternativesNames.length + 0
            ],
        });
      let firstTime = true;
      for (let i = 0; i < this.specsService.decisionCriteria.length; i++) {
        for (
          let j = 0;
          j < this.specsService.decisionAlternativesNames.length;
          j++
        ) {
          if (firstTime) {
            j++;
          }
          alternativeCriterionValueObservable =
            alternativeCriterionValueObservable.pipe(
              concatMap(() =>
                this.apiService.postSpecificDecisionAlternativesCriterionValue({
                  decisionId: this.decisionId,
                  alternativeId: this.alternativesIds[j],
                  criterionId: this.specsService.decisionCriteria[i].id,
                  alternativeCriterionValue:
                    this.alternativesValues.value[
                      i * this.specsService.decisionAlternativesNames.length + j
                    ],
                })
              )
            );
          firstTime = false;
        }
      }

      alternativeCriterionValueObservable.subscribe((res: any) => {
        console.log(res);
      });

      // for (let i = 0; i < this.specsService.decisionCriteria.length; i++) {
      //   for (
      //     let j = 0;
      //     j < this.specsService.decisionAlternativesNames.length;
      //     j++
      //   ) {
      //     this.apiService.postSpecificDecisionAlternativesCriterionValue({
      //       decisionId: this.decisionId,
      //       alternativeId: this.alternativesIds[j],
      //       criterionId: this.specsService.decisionCriteria[i].id,
      //       alternativeCriterionValue:
      //         this.alternativesValues.value[
      //           i * this.specsService.decisionAlternativesNames.length + j
      //         ],
      //     });
      //   }
      // }

      for (let i = 0; i < this.specsService.participants.length; i++) {
        console.log(this.specsService.participants[i].id);
      }
      console.log(this.specsService.decisionSpecs.alternatives);
      console.log(this.alternativesIds);
    }, 500);
  }

  ////////////////////////////

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

  addAlternativesValues() {
    this.alternativesValues.push(new FormControl(''));
  }

  removeAlternativesValues() {
    this.alternativesValues.clear();
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
