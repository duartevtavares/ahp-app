import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';
import { NewDecisionService } from 'src/app/services/new-decision-service.service';

@Component({
  selector: 'user-home-page-component',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss'],
})
export class UserHomePageComponent implements OnInit {
  userId!: number;
  userDecisions: any = [];
  decisionsToShow: any[] = [];
  constructor(
    private permissionService: LoginPermissionServiceService,
    private apiService: ApiService,
    private newDecisionService: NewDecisionService
  ) {}

  ngOnInit(): void {
    this.userId = this.permissionService.userId;
    console.log(this.userId);

    // this.apiService;
    //   .getSpecificDecisionParticipants(1)
    //   .subscribe((result) => console.log(result));

    this.apiService
      .getSpecificDecisionParticipantsByUserId(this.userId)
      .subscribe((result) => {
        this.userDecisions = result;
        console.log('as decisões deste user: ', this.userDecisions);

        this.getparticipantDecisions(this.userDecisions);
      });
  }

  getparticipantDecisions(decisions: any[]) {
    for (let i = 0; i < decisions.length; i++) {
      this.apiService
        .getSpecificDecision(this.userDecisions[i].decision_id)
        .subscribe((result) => {
          this.decisionsToShow.push(result);
        });
    }
    console.log('para mostrar: ', this.decisionsToShow);
  }

  goToDecision(decisionId: any) {
    console.log(decisionId);
    let criteriaArray: any = [];
    let alternativesArray: any = [];

    this.apiService.getSpecificDecision(decisionId).subscribe((res) => {
      this.newDecisionService.decisionIntro = res;
      console.log('decision', this.newDecisionService.decisionIntro);
    });

    this.apiService
      .getSpecificDecisionCriteria(decisionId)
      .subscribe((response) => {
        for (let res of response) {
          console.log(res);
          this.apiService
            .getSpecificCriterion(res.criteria_id)
            .subscribe((secondResponse) => {
              for (let secondRes of secondResponse) {
                criteriaArray.push(secondRes.name);
              }
              this.newDecisionService.decisionCriteria = [...criteriaArray];
              console.log('criteria', criteriaArray);
              console.log(this.newDecisionService.decisionCriteria);
            });
        }
      });

    this.apiService
      .getSpecificDecisionAlternatives(decisionId)
      .subscribe((response) => {
        for (let res of response) {
          alternativesArray.push(res.alternative_name);
        }
        console.log('alternative', alternativesArray);
        this.newDecisionService.decisionAlternatives = [...alternativesArray];
      });
  }
}
