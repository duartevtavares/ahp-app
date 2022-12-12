import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';

@Component({
  selector: 'new-decision-component',
  templateUrl: './new-decision.component.html',
  styleUrls: ['./new-decision.component.scss'],
})
export class NewDecisionComponent implements OnInit {
  decisionCriteria: any;
  decisionAlternatives: any;

  firstColumnCriteriaArray: any = [];
  secondColumnCriteriaArray: any = [];
  firstColumnAlternativesArray: any = [];
  secondColumnAlternativesArray: any = [];

  criteriaComparisonsValues: any[] = [];
  alternativeComparisonsValues: any[] = [];

  realCriteriaMatrix: any[] = [];
  realCriteriaValuesArray: any[] = [];
  criteriaMatrixToShow: any[] = [];
  criteriaStringArray: any[] = [];

  initialValue = 5;

  constructor(public specsService: DecisionSpecificationsService) {}

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
  }

  createDecisionComparisonColumns(namesToBeCompared: [], step: string) {
    for (let i = 0; i < namesToBeCompared.length - 1; i++) {
      for (let j = 0; j < namesToBeCompared.length - i - 1; j++) {
        if (step === 'criteria') {
          this.firstColumnCriteriaArray.push(namesToBeCompared[i]);
        }
        if (step === 'alternatives') {
          this.firstColumnAlternativesArray.push(namesToBeCompared[i]);
        }
      }
    }
    for (let i = 0; i < namesToBeCompared.length - 1; i++) {
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
    }
    for (let i = 0; i < this.decisionCriteria.length; i++) {
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
    // this.changeInputValuesToMatrixValues(this.criteriaComparisonsValues);

    this.changeInputValuesToMatrixValues(this.criteriaComparisonsValues);
    this.createMatrix(this.realCriteriaValuesArray, this.criteriaStringArray);
  }

  changeAlternativeValue(event: any, index: number, otherIndex: number) {
    this.alternativeComparisonsValues[index][otherIndex] = event.value;
  }

  createEmptyMatrix() {
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.realCriteriaMatrix.push([]);
      this.criteriaMatrixToShow.push([]);
    }
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      for (let j = 0; j < this.decisionCriteria.length; j++) {
        this.realCriteriaMatrix[i][j] = 1;
        this.criteriaMatrixToShow[i][j] = '1';
      }
    }
  }

  createMatrix(realValuesVector: number[], valuesToShowVector: string[]) {
    let k = 0;
    for (let i = 0; i < this.decisionCriteria.length; i++) {
      for (let j = 1 + i; j < this.decisionCriteria.length; j++) {
        this.realCriteriaMatrix[i][j] = realValuesVector[k].toFixed(2);
        this.realCriteriaMatrix[j][i] = (1 / realValuesVector[k]).toFixed(2);
        this.criteriaMatrixToShow[i][j] = valuesToShowVector[k];
        this.criteriaMatrixToShow[j][i] =
          valuesToShowVector[k + valuesToShowVector.length / 2];
        k++;
      }
    }

    // k = 0;
    // for (let i = 0; i < this.decisionCriteria.length; i++) {
    //   for (let j = 1 + i; j < this.decisionCriteria.length; j++) {
    //     let stringVal = vector[k].toString();
    //     this.matrix[j][i] = '1/' + stringVal;
    //     k++;
    //   }
    // }

    // for (let i = 0; i < this.decisionCriteria.length; i++) {
    //   for (let j = 0; j < this.decisionCriteria.length; j++) {
    //     if (i === j) {
    //       this.realCriteriaMatrix[i][j] = 1;
    //     }
    //   }
    // }
    console.log(this.criteriaMatrixToShow);
    console.log(this.realCriteriaMatrix);
  }

  changeInputValuesToMatrixValues(valuesArray: number[]) {
    console.log(valuesArray.length);
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
    console.log(this.realCriteriaValuesArray);
    console.log(this.criteriaStringArray);
  }
}
