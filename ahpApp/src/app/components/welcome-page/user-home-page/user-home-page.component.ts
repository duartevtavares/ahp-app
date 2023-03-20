import { Component, OnInit } from '@angular/core';
import { concatMap, from } from 'rxjs';
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
    from(decisions)
      .pipe(
        concatMap((decision) =>
          this.apiService.getSpecificDecision(decision.decision_id)
        )
      )
      .subscribe((result) => {
        console.log(result);
        this.decisionsToShow.push(result);
        console.log('decisoes: ', this.decisionsToShow);
      });
  }

  goToDecision(decisionId: any) {
    console.log(decisionId);
    let criteriaArray: any = [];
    let criteriaIdArray: any = [];
    let alternativesArray: any = [];
    let alternativesIdArray: any = [];

    this.newDecisionService.alternativesCriteriaValues = [];
    this.newDecisionService.decisionIntro = {};
    this.newDecisionService.decisionAlternatives = [];
    this.newDecisionService.decisionAlternativesId = [];
    this.newDecisionService.decisionCriteria = [];
    this.newDecisionService.decisionCriteriaId = [];

    this.apiService.getSpecificDecision(decisionId).subscribe((res) => {
      this.newDecisionService.decisionIntro = res;
      console.log('decision', this.newDecisionService.decisionIntro);
    });

    this.apiService
      .getSpecificDecisionCriteria(decisionId)
      .subscribe((response) => {
        for (let res of response) {
          criteriaIdArray.push(res.criterion_id);
          this.newDecisionService.decisionCriteriaId = [...criteriaIdArray];
          console.log(
            'ids dos criterios',
            this.newDecisionService.decisionCriteriaId
          );
          console.log(res);
        }

        from(response)
          .pipe(
            concatMap((res: any) =>
              this.apiService.getSpecificCriterion(res.criterion_id)
            )
          )
          .subscribe((secondResponse) => {
            for (let secondRes of secondResponse) {
              criteriaArray.push(secondRes.name);
            }
            this.newDecisionService.decisionCriteria = [...criteriaArray];
            // console.log('criteria', criteriaArray);
            console.log(this.newDecisionService.decisionCriteria);
          });
      });

    // for (let res of response) {
    //   criteriaIdArray.push(res.criterion_id);
    //   this.newDecisionService.decisionCriteriaId = [...criteriaIdArray];
    //   console.log(
    //     'ids dos criterios',
    //     this.newDecisionService.decisionCriteriaId
    //   );
    //   console.log(res);
    //   this.apiService
    //     .getSpecificCriterion(res.criterion_id)
    //     .subscribe((secondResponse) => {
    //       for (let secondRes of secondResponse) {
    //         criteriaArray.push(secondRes.name);
    //       }
    //       this.newDecisionService.decisionCriteria = [...criteriaArray];
    //       // console.log('criteria', criteriaArray);
    //       console.log(this.newDecisionService.decisionCriteria);
    //     });
    // }

    this.apiService
      .getSpecificDecisionAlternatives(decisionId)
      .subscribe((response) => {
        for (let res of response) {
          alternativesIdArray.push(res.alternative_id);
          this.newDecisionService.decisionAlternativesId = [
            ...alternativesIdArray,
          ];
          console.log(
            'ids das alternativas',
            this.newDecisionService.decisionAlternativesId
          );
          console.log(res);
        }
        from(response)
          .pipe(
            concatMap((res: any) =>
              this.apiService.getSpecificAlternative(res.alternative_id)
            )
          )
          .subscribe((secondResponse) => {
            for (let secondRes of secondResponse) {
              alternativesArray.push(secondRes.name);
            }
            this.newDecisionService.decisionAlternatives = [
              ...alternativesArray,
            ];
            console.log(this.newDecisionService.decisionAlternatives);
          });
      });

    setTimeout(() => {
      this.apiService
        .getSpecificDecisionAlternativesCriterionValue(decisionId)
        .subscribe((res) => {
          console.log('values: ', res);
          for (
            let i = 0;
            i < this.newDecisionService.decisionCriteriaId.length;
            i++
          ) {
            for (
              let j = 0;
              j < this.newDecisionService.decisionAlternativesId.length;
              j++
            ) {
              for (let k = 0; k < res.length; k++) {
                if (
                  this.newDecisionService.decisionCriteriaId[i] ===
                    res[k].criterion_id &&
                  this.newDecisionService.decisionAlternativesId[j] ===
                    res[k].alternative_id
                ) {
                  this.newDecisionService.alternativesCriteriaValues[
                    i * this.newDecisionService.decisionAlternativesId.length +
                      j
                  ] = res[k].alternative_criterion_value;

                  console.log('aa', res[k].alternative_criterion_value);
                }
              }
            }
          }
          console.log('b', this.newDecisionService.alternativesCriteriaValues);
        });
    }, 200);
  }
}
