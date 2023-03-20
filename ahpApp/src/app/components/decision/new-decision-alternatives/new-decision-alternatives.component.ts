import { Component, OnInit } from '@angular/core';
import { concatMap, from, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';
import { MathService } from 'src/app/services/math.service';
import { NewDecisionService } from 'src/app/services/new-decision-service.service';

@Component({
  selector: 'new-decision-alternatives-component',
  templateUrl: './new-decision-alternatives.component.html',
  styleUrls: ['./new-decision-alternatives.component.scss'],
})
export class NewDecisionAlternativesComponent implements OnInit {
  decisionCriteria: string[] = [];
  decisionAlternatives: string[] = [];

  firstColumnCriteriaIdArray: number[] = [];
  secondColumnCriteriaIdArray: number[] = [];
  firstColumnAlternativesIdArray: number[] = [];
  secondColumnAlternativesIdArray: number[] = [];

  firstColumnCriteriaArray: string[] = [];
  secondColumnCriteriaArray: string[] = [];
  firstColumnAlternativesArray: string[] = [];
  secondColumnAlternativesArray: string[] = [];

  firstColumnAlternativesCriteriaValuesArray: number[] = [];
  secondColumnAlternativesCriteriaValuesArray: number[] = [];

  criteriaComparisonsValues: any[] = [];
  alternativeComparisonsValues: any[] = [];

  realCriteriaMatrix: any[] = [];
  realCriteriaValuesArray: number[] = [];
  criteriaMatrixToShow: any[] = [];
  criteriaStringArray: string[] = [];

  realAlternativesMatrix: any[] = [];
  realAlternativesValuesArray: any[] = [];
  alternativesMatrixToShow: any[] = [];
  alternativesStringArray: any[] = [];

  criteriaWeightsArray: number[] = [];
  alternativesWeightsArray: any[] = [];
  finalWeightsArray: number[] = [];

  initialValue = 5;
  showCriteriaMatrix = false;
  showAlternativesMatrix = false;

  chartData: { name: string; value: number }[] = [];
  finalResultsChartData: { name: string; value: number }[] = [];
  update$: Subject<any> = new Subject();

  isCriteriaMatrixActive: boolean = false;

  criteriaConsistencyRatio: number = 0;
  alternativesConsistencyRatio: number[] = [];

  formIsSubmited: boolean = false;
  alternativesCriteriaValues: number[] = [];

  formatLabel(val: any): string {
    switch (val) {
      case 1:
        val = '1/9';
        break;
      case 2:
        val = '1/7';
        break;
      case 3:
        val = '1/5';
        break;
      case 4:
        val = '1/3';
        break;
      case 5:
        val = 1;
        break;
      case 6:
        val = 3;
        break;
      case 7:
        val = 5;
        break;
      case 8:
        val = 7;
        break;
      case 9:
        break;
    }
    return val;
  }

  constructor(
    public specsService: DecisionSpecificationsService,
    public mathService: MathService,
    public newDecisionService: NewDecisionService,
    public apiService: ApiService,
    private permissionService: LoginPermissionServiceService
  ) {}

  ngOnInit(): void {
    this.alternativesCriteriaValues = [
      ...this.newDecisionService.alternativesCriteriaValues,
    ];
    console.log(this.alternativesCriteriaValues);
    this.decisionCriteria = [...this.newDecisionService.decisionCriteria];
    this.decisionAlternatives = [
      ...this.newDecisionService.decisionAlternatives,
    ];
    console.log(this.decisionCriteria);

    // for (let i = 0; i < this.specsService.decisionCriteria.length; i++) {
    //   this.decisionCriteria.push(this.specsService.decisionCriteria[i].name);
    // } //TODO need to change to see which decision it is
    //this.decisionAlternatives = this.specsService.decisionSpecs.alternatives;

    this.createDecisionComparisonColumns(this.decisionCriteria, 'criteria');
    this.createDecisionComparisonColumns(
      this.decisionAlternatives,
      'alternatives'
    );
    console.log(this.firstColumnAlternativesArray);

    this.createAlternativeCriteriaValuesColumns(
      this.alternativesCriteriaValues
    );

    console.log(this.firstColumnAlternativesCriteriaValuesArray);
    console.log(this.secondColumnAlternativesCriteriaValuesArray);

    this.createArraysInitialValues();

    this.createEmptyMatrix();
    this.createAlternativesEmptyMatrix();

    this.changeInputValuesToMatrixValues(
      this.criteriaComparisonsValues,
      'criteria'
    );
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.changeInputValuesToMatrixValues(
        this.alternativeComparisonsValues,
        'alternatives'
      );
    }

    this.createMatrix(
      this.realCriteriaValuesArray,
      this.criteriaStringArray,
      'criteria'
    );
    this.createMatrix(
      this.realAlternativesValuesArray,
      this.alternativesStringArray,
      'alternatives'
    );

    this.criteriaWeightsArray = this.mathService.weightCalculation(
      this.realCriteriaMatrix,
      this.decisionCriteria.length
    );

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativesWeightsArray[i] = this.createWeightsArray(
        this.realAlternativesMatrix[i],
        this.decisionAlternatives.length
      );
    }

    this.finalWeightsArray = this.computeFinalWeights(
      this.alternativesWeightsArray,
      this.criteriaWeightsArray
    );
    this.createFinalResultschartData();

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativesConsistencyRatio[i] = 0;
    }
  }

  createDecisionComparisonColumns(namesToBeCompared: string[], step: string) {
    for (let i = 0; i < namesToBeCompared.length - 1; i++) {
      for (let j = 0; j < namesToBeCompared.length - i - 1; j++) {
        if (step === 'criteria') {
          this.firstColumnCriteriaArray.push(namesToBeCompared[i]);
          this.firstColumnCriteriaIdArray.push(
            this.newDecisionService.decisionCriteriaId[i]
          );
        }
        if (step === 'alternatives') {
          this.firstColumnAlternativesArray.push(namesToBeCompared[i]);
          this.firstColumnAlternativesIdArray.push(
            this.newDecisionService.decisionAlternativesId[i]
          );
        }
      }
      for (let j = 1 + i; j < namesToBeCompared.length; j++) {
        if (step === 'criteria') {
          this.secondColumnCriteriaArray.push(namesToBeCompared[j]);
          this.secondColumnCriteriaIdArray.push(
            this.newDecisionService.decisionCriteriaId[j]
          );
        }
        if (step === 'alternatives') {
          this.secondColumnAlternativesArray.push(namesToBeCompared[j]);
          this.secondColumnAlternativesIdArray.push(
            this.newDecisionService.decisionAlternativesId[j]
          );
        }
      }
    }
  }

  createAlternativeCriteriaValuesColumns(namesToBeCompared: number[]) {
    let i = 0;
    let outterArray: any = [];
    let innerArray: any = [];
    console.log(namesToBeCompared);
    console.log(this.decisionCriteria);
    console.log(this.decisionAlternatives);
    for (let k = 0; k < this.decisionCriteria.length; k++) {
      innerArray = namesToBeCompared.slice(
        i,
        i + this.decisionAlternatives.length
      );
      i += this.decisionAlternatives.length;
      outterArray.push(innerArray);
      console.log(innerArray); //TODO: está mal
      console.log('out: ', outterArray);
    }
    for (let k = 0; k < this.decisionCriteria.length; k++) {
      for (let i = 0; i < outterArray[k].length - 1; i++) {
        for (let j = 0; j < outterArray[k].length - i - 1; j++) {
          this.firstColumnAlternativesCriteriaValuesArray.push(
            outterArray[k][i]
          );
        }
        for (let j = 1 + i; j < outterArray[k].length; j++) {
          this.secondColumnAlternativesCriteriaValuesArray.push(
            outterArray[k][j]
          );
        }
      }
    }
  }

  createArraysInitialValues() {
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativeComparisonsValues.push([]);
      for (let j = 0; j < this.firstColumnAlternativesArray.length; j++) {
        this.alternativeComparisonsValues[i][j] = this.initialValue;
      }
    }
    for (let i = 0; i < this.firstColumnCriteriaArray.length; i++) {
      this.criteriaComparisonsValues.push(this.initialValue);
    }
  }

  changeCriteriaValue(event: any, index: number) {
    this.criteriaComparisonsValues[index] = event.value;
    this.isCriteriaMatrixActive = true;

    this.changeInputValuesToMatrixValues(
      this.criteriaComparisonsValues,
      'criteria'
    );
    this.createMatrix(
      this.realCriteriaValuesArray,
      this.criteriaStringArray,
      'criteria'
    );

    this.criteriaWeightsArray = this.mathService.weightCalculation(
      this.realCriteriaMatrix,
      this.decisionCriteria.length
    );

    this.criteriaConsistencyRatio = this.createConsistencyRatios(
      this.realCriteriaMatrix,
      this.criteriaWeightsArray
    );
    // console.log(this.criteriaConsistencyRatio);
    this.createCriteriaChartData();

    this.finalWeightsArray = this.computeFinalWeights(
      this.alternativesWeightsArray,
      this.criteriaWeightsArray
    );
    this.createFinalResultschartData();

    console.log(this.criteriaComparisonsValues);
    console.log(this.realCriteriaValuesArray);
  }

  changeAlternativeValue(event: any, index: number, otherIndex: number) {
    this.alternativeComparisonsValues[index][otherIndex] = event.value;
    this.changeInputValuesToMatrixValues(
      this.alternativeComparisonsValues,
      'alternatives'
    );

    this.createMatrix(
      this.realAlternativesValuesArray,
      this.alternativesStringArray,
      'alternatives'
    );

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativesWeightsArray[i] = this.createWeightsArray(
        this.realAlternativesMatrix[i],
        this.decisionAlternatives.length
      );
    }

    console.log('peso das alternativas: ', this.alternativesWeightsArray);

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativesConsistencyRatio[i] = this.createConsistencyRatios(
        this.realAlternativesMatrix[i],
        this.alternativesWeightsArray[i]
      );
    }
    console.log(
      'racio de consistencia das alternativas: ',
      this.alternativesConsistencyRatio
    );

    this.finalWeightsArray = this.computeFinalWeights(
      this.alternativesWeightsArray,
      this.criteriaWeightsArray
    );
    this.createFinalResultschartData();
  }

  createEmptyMatrix() {
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.realCriteriaMatrix.push([]);
      this.criteriaMatrixToShow.push([]);
      for (let j = 0; j < this.decisionCriteria.length; j++) {
        this.realCriteriaMatrix[i][j] = 1;
        this.criteriaMatrixToShow[i][j] = '1';
      }
    }
  }

  createAlternativesEmptyMatrix() {
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.realAlternativesMatrix.push([]);
      this.alternativesMatrixToShow.push([]);
      for (let j = 0; j < this.decisionAlternatives.length; j++) {
        this.realAlternativesMatrix[i][j] = [];
        this.alternativesMatrixToShow[i][j] = [];
        for (let k = 0; k < this.decisionAlternatives.length; k++) {
          this.realAlternativesMatrix[i][j][k] = 1;
          this.alternativesMatrixToShow[i][j][k] = '1';
        }
      }
    }
  }

  createMatrix(
    realValuesVector: any[],
    valuesToShowVector: string[],
    parameter: string
  ) {
    if (parameter === 'criteria') {
      let m = 0;
      for (let i = 0; i < this.decisionCriteria.length; i++) {
        for (let j = 1 + i; j < this.decisionCriteria.length; j++) {
          this.realCriteriaMatrix[i][j] = realValuesVector[m];
          this.realCriteriaMatrix[j][i] = 1 / realValuesVector[m];
          this.criteriaMatrixToShow[i][j] = valuesToShowVector[m];
          this.criteriaMatrixToShow[j][i] =
            valuesToShowVector[m + valuesToShowVector.length / 2];
          m++;
        }
      }
    }
    if (parameter === 'alternatives') {
      let m = 0;
      let n = 0;

      // console.log(realValuesVector);
      // console.log(valuesToShowVector);
      for (let i = 0; i < this.decisionCriteria.length; i++) {
        for (let j = 0; j < this.decisionAlternatives.length; j++) {
          for (let k = 1 + j; k < this.decisionAlternatives.length; k++) {
            this.realAlternativesMatrix[i][j][k] = realValuesVector[m][n];
            this.realAlternativesMatrix[i][k][j] = 1 / realValuesVector[m][n];
            this.alternativesMatrixToShow[i][j][k] = valuesToShowVector[m][n];
            this.alternativesMatrixToShow[i][k][j] =
              valuesToShowVector[m][n + valuesToShowVector[m].length / 2];
            n++;
          }
        }
        n = 0;
        m++;
      }
    }
  }

  changeInputValuesToMatrixValues(valuesArray: any[], parameter: string) {
    if (parameter === 'criteria') {
      for (let i = 0; i < valuesArray.length; i++) {
        switch (valuesArray[i]) {
          case 1:
            this.realCriteriaValuesArray[i] = 9;
            this.criteriaStringArray[i] = '1/9';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '9';
            break;
          case 2:
            this.realCriteriaValuesArray[i] = 7;
            this.criteriaStringArray[i] = '1/7';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '7';
            break;
          case 3:
            this.realCriteriaValuesArray[i] = 5;
            this.criteriaStringArray[i] = '1/5';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '5';
            break;
          case 4:
            this.realCriteriaValuesArray[i] = 3;
            this.criteriaStringArray[i] = '1/3';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '3';
            break;
          case 5:
            this.realCriteriaValuesArray[i] = 1;
            this.criteriaStringArray[i] = '1';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1';
            break;
          case 6:
            this.realCriteriaValuesArray[i] = 1 / 3;
            this.criteriaStringArray[i] = '3';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/3';
            break;
          case 7:
            this.realCriteriaValuesArray[i] = 1 / 5;
            this.criteriaStringArray[i] = '5';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/5';
            break;
          case 8:
            this.realCriteriaValuesArray[i] = 1 / 7;
            this.criteriaStringArray[i] = '7';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/7';
            break;
          case 9:
            this.realCriteriaValuesArray[i] = 1 / 9;
            this.criteriaStringArray[i] = '9';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/9';
            break;
        }
      }
    }

    if (parameter === 'alternatives') {
      for (let i = 0; i < valuesArray.length; i++) {
        this.realAlternativesValuesArray[i] = [];
        this.alternativesStringArray[i] = [];
      }

      for (let i = 0; i < valuesArray.length; i++) {
        for (let j = 0; j < valuesArray[i].length; j++) {
          switch (valuesArray[i][j]) {
            case 1:
              this.realAlternativesValuesArray[i][j] = 9;
              this.alternativesStringArray[i][j] = '1/9';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '9';
              break;
            case 2:
              this.realAlternativesValuesArray[i][j] = 7;
              this.alternativesStringArray[i][j] = '1/7';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '7';
              break;
            case 3:
              this.realAlternativesValuesArray[i][j] = 5;
              this.alternativesStringArray[i][j] = '1/5';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '5';
              break;
            case 4:
              this.realAlternativesValuesArray[i][j] = 3;
              this.alternativesStringArray[i][j] = '1/3';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '3';
              break;
            case 5:
              this.realAlternativesValuesArray[i][j] = 1;
              this.alternativesStringArray[i][j] = '1';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1';
              break;
            case 6:
              this.realAlternativesValuesArray[i][j] = 1 / 3;
              this.alternativesStringArray[i][j] = '3';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/3';
              break;
            case 7:
              this.realAlternativesValuesArray[i][j] = 1 / 5;
              this.alternativesStringArray[i][j] = '5';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/5';
              break;
            case 8:
              this.realAlternativesValuesArray[i][j] = 1 / 7;
              this.alternativesStringArray[i][j] = '7';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/7';
              break;
            case 9:
              this.realAlternativesValuesArray[i][j] = 1 / 9;
              this.alternativesStringArray[i][j] = '9';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/9';
              break;
          }
        }
      }
    }
  }

  createCriteriaChartData() {
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.chartData[i] = {
        name: this.decisionCriteria[i],
        value: this.criteriaWeightsArray[i],
      };
    }
    this.chartData = [...this.chartData];
    this.update$.next(true);
  }

  createFinalResultschartData() {
    for (let i = 0; i < this.decisionAlternatives.length; i++) {
      this.finalResultsChartData[i] = {
        name: this.decisionAlternatives[i],
        value: this.finalWeightsArray[i],
      };
    }
  }

  displayCriteriaMatrix() {
    if (this.isCriteriaMatrixActive === false) {
      this.isCriteriaMatrixActive = true;
    } else {
      this.isCriteriaMatrixActive = false;
    }
  }

  createWeightsArray(matrix: any[], vectorLength: number): number[] {
    return this.mathService.weightCalculation(matrix, vectorLength);
  }

  createConsistencyRatios(matrix: any[], vector: number[]) {
    return this.mathService.computeConsistencyRatio(matrix, vector);
  }

  computeFinalWeights(
    alternativesWeights: any[],
    criteriaWeights: number[]
  ): number[] {
    return this.mathService.computeFinalWeights(
      alternativesWeights,
      criteriaWeights
    );
  }

  async onSubmit() {
    this.formIsSubmited = true;

    let userId = this.permissionService.userId;
    console.log(userId);
    console.log(this.newDecisionService.decisionIntro.id);
    console.log(this.firstColumnCriteriaIdArray);
    console.log(this.secondColumnCriteriaIdArray);
    console.log(this.criteriaComparisonsValues);

    for (let i = 0; i < this.firstColumnCriteriaIdArray.length; i++) {
      this.apiService.postSpecificParticipantDecisionCriteriaComparison({
        decisionId: this.newDecisionService.decisionIntro.id,
        userId: userId,
        criterion1Id: this.firstColumnCriteriaIdArray[i],
        criterion2Id: this.secondColumnCriteriaIdArray[i],
        pairwiseValue: this.criteriaComparisonsValues[i],
      });
    }

    console.log(this.newDecisionService.decisionCriteriaId);
    console.log(this.firstColumnAlternativesIdArray);
    console.log(this.secondColumnAlternativesIdArray);
    console.log(this.alternativeComparisonsValues);

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      for (let j = 0; j < this.firstColumnAlternativesIdArray.length; j++) {
        this.apiService.postSpecificParticipantDecisionAlternativesComparison({
          decisionId: this.newDecisionService.decisionIntro.id,
          userId: userId,
          criterionId: this.newDecisionService.decisionCriteriaId[i],
          alternative1Id: this.firstColumnAlternativesIdArray[j],
          alternative2Id: this.secondColumnAlternativesIdArray[j],
          pairwiseValue: this.alternativeComparisonsValues[i][j],
        });
      }
    }

    this.apiService
      .getSpecificParticipantDecisionCriteriaComparison({
        decisionId: this.newDecisionService.decisionIntro.id,
        userId: userId,
      })
      .subscribe((response) => {
        console.log(response);
      });

    this.apiService.updateSpecificDecisionParticipantsDone({
      decisionId: this.newDecisionService.decisionIntro.id,
      participantsId: userId,
    });
  }
}
