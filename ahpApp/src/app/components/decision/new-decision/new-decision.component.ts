import { Component, OnInit } from '@angular/core';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'new-decision-component',
  templateUrl: './new-decision.component.html',
  styleUrls: ['./new-decision.component.scss'],
})
export class NewDecisionComponent implements OnInit {
  decisionCriteria: string[] = [];
  decisionAlternatives: string[] = [];

  firstColumnCriteriaArray: string[] = [];
  secondColumnCriteriaArray: string[] = [];
  firstColumnAlternativesArray: string[] = [];
  secondColumnAlternativesArray: string[] = [];

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
  alternativesWeightsArray: number[] = [];

  initialValue = 5;
  showCriteriaMatrix = false;
  showAlternativesMatrix = false;

  chartData: { name: string; value: number }[] = [];
  isCriteriaMatrixActive: boolean = false;

  consistencyRatio: number = 0;

  formatLabel(val: number) {
    switch (val) {
      case 1:
        val = 9;
        break;
      case 2:
        val = 7;
        break;
      case 3:
        val = 5;
        break;
      case 4:
        val = 3;
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
    public mathService: MathService
  ) {}

  ngOnInit(): void {
    this.decisionCriteria = this.specsService.decisionSpecs.criteria;
    this.decisionAlternatives = this.specsService.decisionSpecs.alternatives;

    this.createDecisionComparisonColumns(this.decisionCriteria, 'criteria');
    this.createDecisionComparisonColumns(
      this.decisionAlternatives,
      'alternatives'
    );

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
    // console.log(this.realAlternativesValuesArray);

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
    // console.log(this.realAlternativesMatrix);

    this.criteriaWeightsArray = this.mathService.weightCalculation(
      this.realCriteriaMatrix,
      this.decisionCriteria.length
    );
    this.createCriteriaChartData();
  }

  createDecisionComparisonColumns(namesToBeCompared: string[], step: string) {
    for (let i = 0; i < namesToBeCompared.length - 1; i++) {
      for (let j = 0; j < namesToBeCompared.length - i - 1; j++) {
        if (step === 'criteria') {
          this.firstColumnCriteriaArray.push(namesToBeCompared[i]);
        }
        if (step === 'alternatives') {
          this.firstColumnAlternativesArray.push(namesToBeCompared[i]);
        }
      }
      for (let j = 1 + i; j < namesToBeCompared.length; j++) {
        if (step === 'criteria') {
          this.secondColumnCriteriaArray.push(namesToBeCompared[j]);
        }
        if (step === 'alternatives') {
          this.secondColumnAlternativesArray.push(namesToBeCompared[j]);
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
    this.isCriteriaMatrixActive = false;
    this.criteriaComparisonsValues[index] = event.value;

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

    this.consistencyRatio = this.createConsistencyRatios(
      this.realCriteriaMatrix,
      this.criteriaWeightsArray
    );
    console.log(this.consistencyRatio);
    this.createCriteriaChartData();
  }

  changeAlternativeValue(event: any, index: number, otherIndex: number) {
    this.alternativeComparisonsValues[index][otherIndex] = event.value;
    // console.log(this.alternativeComparisonsValues);
    this.changeInputValuesToMatrixValues(
      this.alternativeComparisonsValues,
      'alternatives'
    );

    this.createMatrix(
      this.realAlternativesValuesArray,
      this.alternativesStringArray,
      'alternatives'
    );
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
            this.realAlternativesMatrix[i][j][k] =
              realValuesVector[m][n].toFixed(2);
            this.realAlternativesMatrix[i][k][j] = (
              1 / realValuesVector[m][n]
            ).toFixed(2);
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
            this.realCriteriaValuesArray[i] = 1 / 9;
            this.criteriaStringArray[i] = '1/9';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '9';
            break;
          case 2:
            this.realCriteriaValuesArray[i] = 1 / 7;
            this.criteriaStringArray[i] = '1/7';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '7';
            break;
          case 3:
            this.realCriteriaValuesArray[i] = 1 / 5;
            this.criteriaStringArray[i] = '1/5';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '5';
            break;
          case 4:
            this.realCriteriaValuesArray[i] = 1 / 3;
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
            this.realCriteriaValuesArray[i] = 3;
            this.criteriaStringArray[i] = '3';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/3';
            break;
          case 7:
            this.realCriteriaValuesArray[i] = 5;
            this.criteriaStringArray[i] = '5';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/5';
            break;
          case 8:
            this.realCriteriaValuesArray[i] = 7;
            this.criteriaStringArray[i] = '7';
            this.criteriaStringArray[i + this.firstColumnCriteriaArray.length] =
              '1/7';
            break;
          case 9:
            this.realCriteriaValuesArray[i] = 9;
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
              this.realAlternativesValuesArray[i][j] = 1 / 9;
              this.alternativesStringArray[i][j] = '1/9';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '9';
              break;
            case 2:
              this.realAlternativesValuesArray[i][j] = 1 / 7;
              this.alternativesStringArray[i][j] = '1/7';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '7';
              break;
            case 3:
              this.realAlternativesValuesArray[i][j] = 1 / 5;
              this.alternativesStringArray[i][j] = '1/5';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '5';
              break;
            case 4:
              this.realAlternativesValuesArray[i][j] = 1 / 3;
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
              this.realAlternativesValuesArray[i][j] = 3;
              this.alternativesStringArray[i][j] = '3';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/3';
              break;
            case 7:
              this.realAlternativesValuesArray[i][j] = 5;
              this.alternativesStringArray[i][j] = '5';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/5';
              break;
            case 8:
              this.realAlternativesValuesArray[i][j] = 7;
              this.alternativesStringArray[i][j] = '7';
              this.alternativesStringArray[i][
                j + this.firstColumnAlternativesArray.length
              ] = '1/7';
              break;
            case 9:
              this.realAlternativesValuesArray[i][j] = 9;
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
  }

  displayCriteriaMatrix() {
    if (this.isCriteriaMatrixActive === false) {
      this.isCriteriaMatrixActive = true;
    } else {
      this.isCriteriaMatrixActive = false;
    }
  }

  createConsistencyRatios(matrix: any[], vector: number[]) {
    return this.mathService.computeConsistencyRatio(matrix, vector);
  }
}
