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

  criteriaValues: any[] = [];
  alternativeValues: any[] = [];
  criteriaComparisons: any[] = [];
  alternativeComparisons: any[] = [];

  slidervalue: any;
  formatLabel(val: number) {
    return val;
  }
  value = 5;

  constructor(public specsService: DecisionSpecificationsService) {}

  ngOnInit(): void {
    this.decisionCriteria = this.specsService.decisionSpecs.criteria;
    this.decisionAlternatives = this.specsService.decisionSpecs.alternatives;
    let alternativesInitialValues: number[] = [];

    this.createDecisionComparisonColumns(this.decisionCriteria, 'criteria');
    this.createDecisionComparisonColumns(
      this.decisionAlternatives,
      'alternatives'
    );

    this.fillCriteriaAndAlternativesArrays(alternativesInitialValues);
    // for (let i = 0; i < this.firstColumnAlternativesArray.length; i++) {
    //   alternativesLength.push(5);
    // }

    // for (let i = 0; i < this.decisionCriteria.length; i++) {
    //   this.alternativeComparisons.push(alternativesLength);
    // }

    // for (let i = 0; i < this.firstColumnCriteriaArray.length; i++) {
    //   this.criteriaComparisons.push(5);
    // }

    //   for (let i = 0; i < this.decisionCriteria.length - 1; i++) {
    //     for (let j = 0; j < this.decisionCriteria.length - i - 1; j++) {
    //       this.firstColumnCriteriaArray.push(this.decisionCriteria[i]);
    //     }
    //   }
    //   for (let i = 0; i < this.decisionCriteria.length - 1; i++) {
    //     for (let j = 1 + i; j < this.decisionCriteria.length; j++) {
    //       this.secondColumnCriteriaArray.push(this.decisionCriteria[j]);
    //     }
    //   }
    //   console.log(this.firstColumnCriteriaArray);
    //   console.log(this.secondColumnCriteriaArray);

    //   for (let i = 0; i < this.decisionAlternatives.length - 1; i++) {
    //     for (let j = 0; j < this.decisionAlternatives.length - i - 1; j++) {
    //       this.firstColumnAlternativesArray.push(this.decisionAlternatives[i]);
    //     }
    //   }
    //   for (let i = 0; i < this.decisionAlternatives.length - 1; i++) {
    //     for (let j = 1 + i; j < this.decisionAlternatives.length; j++) {
    //       this.secondColumnAlternativesArray.push(this.decisionAlternatives[j]);
    //     }
    //   }
    //   console.log(this.firstColumnAlternativesArray);
    //   console.log(this.secondColumnAlternativesArray);
  }

  fillCriteriaAndAlternativesArrays(alternativesArrayInitialValues: number[]) {
    for (let i = 0; i < this.firstColumnAlternativesArray.length; i++) {
      alternativesArrayInitialValues.push(5);
    }

    for (let i = 0; i < this.decisionCriteria.length; i++) {
      this.alternativeComparisons.push(alternativesArrayInitialValues);
    }
    console.log(this.alternativeComparisons);

    for (let i = 0; i < this.firstColumnCriteriaArray.length; i++) {
      this.criteriaComparisons.push(5);
    }
    console.log(this.criteriaComparisons);
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

  changeCriteriaValue(event: any, i: number) {
    this.criteriaValues[i] = event.value;
    console.log(this.criteriaValues);
  }

  changeAlternativeValue(event: any, i: number, j: number) {
    this.alternativeComparisons[i][j] = event.value;
    console.log(this.alternativeComparisons);
  }
}
