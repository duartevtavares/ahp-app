import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';

@Component({
  selector: 'admin-home-page-component',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {
  allDecisions: any;
  incompleteDecisions: any;
  completeDecisions: any;
  allDecisionsName: any;
  constructor(
    private specsService: DecisionSpecificationsService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.incompleteDecisions = [];
    this.completeDecisions = [];

    this.apiService.getDecisions().subscribe((result) => {
      this.allDecisions = result;
      for (let res of result) {
        if (res.done.data[0] === 0) {
          let isDone = true;
          this.apiService
            .getSpecificDecisionParticipantsByDecisionId(res.id)
            .subscribe((secondResult) => {
              for (let secondRes of secondResult) {
                if (secondRes.done.data[0] === 0) {
                  isDone = false;
                }
              }
              if (isDone === true) {
                this.completeDecisions.push(res);
                const decisionId = res.id;
                this.apiService
                  .updateSpecificDecisionDone({ decisionId: decisionId })
                  .subscribe();
              } else {
                this.incompleteDecisions.push(res);
              }
            });
        } else {
          this.completeDecisions.push(res);
        }
      }
    });
  }

  showDecision(decision: any) {
    console.log(decision);
    this.apiService
      .getSpecificDecisionParticipantsByDecisionId(decision.id)
      .subscribe((result) => {
        console.log(result);
      });
    this.apiService
      .getSpecificDecisionCriteria(decision.id)
      .subscribe((result) => {
        console.log(result);
      });
    this.apiService
      .getSpecificDecisionAlternatives(decision.id)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
