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
  }

  changeAlternativeValue(event: any, index: number, otherIndex: number) {
    this.alternativeComparisonsValues[index][otherIndex] = event.value;
  }
}
