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
  decisionsParticipants: any;
  decisionsCriteria: any;
  decisionsAlternatives: any;
  constructor(
    private specsService: DecisionSpecificationsService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.incompleteDecisions = [];
    this.completeDecisions = [];
    this.decisionsParticipants = [];
    this.decisionsCriteria = [];
    this.decisionsAlternatives = [];

    this.apiService.getDecisions().subscribe((result) => {
      console.log('entrou1');
      console.log(result);
      this.allDecisions = result;
      for (let res of result) {
        if (res.done.data[0] === 0) {
          console.log('entrou2');
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
                console.log('entrou3');
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

      for (let i = 0; i < result.length; i++) {
        this.decisionsParticipants.push([]);
        this.decisionsCriteria.push([]);
        this.decisionsAlternatives.push([]);
      }
      for (let i = 0; i < result.length; i++) {
        this.showDecision(i, result[i]);
      }
    });
  }

  showDecision(index: number, decision: any) {
    this.apiService
      .getSpecificDecisionParticipantsByDecisionId(decision.id)
      .subscribe((result) => {
        for (let j = 0; j < result.length; j++) {
          this.apiService
            .getSpecificUser(result[j].user_id)
            .subscribe((response) => {
              this.decisionsParticipants[index][j] = response.name;
            });
        }
      });
    this.apiService
      .getSpecificDecisionCriteria(decision.id)
      .subscribe((result) => {
        for (let j = 0; j < result.length; j++) {
          this.apiService
            .getSpecificCriterion(result[j].criterion_id)
            .subscribe((res) => {
              console.log(res);
              console.log(res[0].name);
              this.decisionsCriteria[index][j] = res[0].name;
            });
        }
      });
    this.apiService
      .getSpecificDecisionAlternatives(decision.id)
      .subscribe((result) => {
        console.log(result);
        for (let j = 0; j < result.length; j++) {
          this.apiService
            .getSpecificAlternative(result[j].alternative_id)
            .subscribe((res) => {
              console.log(res);
              console.log(res[0].name);
              this.decisionsAlternatives[index][j] = res[0].name;
            });
        }
      });
  }
}
