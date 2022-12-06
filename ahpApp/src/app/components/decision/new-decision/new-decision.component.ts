import { Component, OnInit } from '@angular/core';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';

@Component({
  selector: 'new-decision-component',
  templateUrl: './new-decision.component.html',
  styleUrls: ['./new-decision.component.scss'],
})
export class NewDecisionComponent implements OnInit {
  decisionSpecifications: any;
  firstColumnCriteriaArray: any = [];
  secondColumnCriteriaArray: any = [];

  criteriaValues: any[] = [];

  slidervalue: any;
  formatLabel(val: number) {
    return val;
  }

  constructor(public specsService: DecisionSpecificationsService) {}

  ngOnInit(): void {
    this.decisionSpecifications = this.specsService.decisionSpecs.criteria;
    console.log(this.decisionSpecifications);

    for (let i = 0; i < this.decisionSpecifications.length - 1; i++) {
      for (let j = 0; j < this.decisionSpecifications.length - i - 1; j++) {
        this.firstColumnCriteriaArray.push(this.decisionSpecifications[i]);
      }
    }
    for (let i = 0; i < this.decisionSpecifications.length - 1; i++) {
      for (let j = 1 + i; j < this.decisionSpecifications.length; j++) {
        this.secondColumnCriteriaArray.push(this.decisionSpecifications[j]);
      }
    }
    console.log(this.firstColumnCriteriaArray);
    console.log(this.secondColumnCriteriaArray);
  }

  changeCriteriaValue(event: any, index: number) {
    this.criteriaValues.splice(index, 1, event.value);
    console.log(this.criteriaValues);
  }
}
