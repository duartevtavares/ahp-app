import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

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
  decisionsCategory: any;
  decisionsAlternatives: any;
  chartData: { name: string; value: number }[] = [];
  chartDataArray: any = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.incompleteDecisions = [];
    this.completeDecisions = [];
    this.decisionsParticipants = [];
    this.decisionsCriteria = [];
    this.decisionsAlternatives = [];
    this.decisionsCategory = [];

    this.apiService.getCategories().subscribe((result) => {
      console.log('categories: ', result);
    });

    this.apiService.getSpecificCategoryCriteria(1).subscribe((result) => {
      console.log('category and its criteria: ', result);
    });

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
                  .subscribe(() => {
                    this.apiService.getDecisions().subscribe((result) => {
                      this.allDecisions = result;
                    });
                  });
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

        this.chartDataArray.push([]);
      }
      setTimeout(() => {
        for (let i = 0; i < result.length; i++) {
          this.showDecision(i, result[i]);
        }
      }, 300);
    });
  }

  open(index: number) {
    let finalResults: any = [];
    this.chartData = [];
    let finalResultHelperArray: any = [];
    if (this.allDecisions[index].done.data[0] === 1) {
      this.apiService
        .getSpecificDecisionParticipantsByDecisionId(
          this.allDecisions[index].id
        )
        .subscribe((result) => {
          for (let j = 0; j < result.length; j++) {
            this.apiService
              .getSpecificParticipantDecisionFinalResults({
                decisionId: this.allDecisions[index].id,
                userId: result[j].user_id,
              })
              .subscribe((res) => {
                finalResultHelperArray.push(res);
              });
          }
          setTimeout(() => {
            for (let m = 0; m < finalResultHelperArray[0].length; m++) {
              let counter = 0;
              for (let n = 0; n < finalResultHelperArray.length; n++) {
                counter += finalResultHelperArray[n][m].final_result;
              }
              counter = counter / finalResultHelperArray.length;
              finalResults[m] = counter;
            }
            console.log('Final results: ', finalResults);
            for (let i = 0; i < this.decisionsAlternatives[index].length; i++) {
              this.chartData.push({
                name: this.decisionsAlternatives[index][i],
                value: finalResults[i],
              });
            }
            console.log('chart data: ', this.chartData);
            this.chartDataArray[index] = this.chartData;
          }, 200);
        });
    }
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
              this.decisionsCriteria[index][j] = res[0].name;
            });
        }
      });
    this.apiService
      .getSpecificDecisionAlternatives(decision.id)
      .subscribe((result) => {
        for (let j = 0; j < result.length; j++) {
          this.apiService
            .getSpecificAlternative(result[j].alternative_id)
            .subscribe((res) => {
              this.decisionsAlternatives[index][j] = res[0].name;
            });
        }
      });
  }
}
