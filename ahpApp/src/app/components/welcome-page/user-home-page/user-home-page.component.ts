import { Component, OnInit } from '@angular/core';
import { concatMap, from, take, tap, timer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';
import { NewDecisionService } from 'src/app/services/new-decision-service.service';
import * as math from 'mathjs';

@Component({
  selector: 'user-home-page-component',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss'],
})
export class UserHomePageComponent implements OnInit {
  userId!: number;
  decisionId!: number;
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
    this.decisionId = decisionId;
    let criteriaArray: any = [];
    let criteriaIdArray: any = [];
    let alternativesArray: any = [];
    let alternativesIdArray: any = [];
    let alternativeCriteria: any = [];

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
          // alternativeCriteria = res;
          console.log('values123: ', res);
          // console.log('values: ', alternativeCriteria);
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

                  //console.log('aa', res[k].alternative_criterion_value);
                }
              }
            }
          }
          console.log('b', this.newDecisionService.alternativesCriteriaValues);
        });
    }, 200);

    //checks if the user already participated in more than 3 finished decisions
    //TODO: tem de ser modificado para perceber se as categorias das decisoes sao as mesmas e nao so se completou 3 decisoes
    let doneDecisionsCounter = 0;
    let doneDecisions: any[] = [];
    for (let decisionToShow of this.decisionsToShow) {
      if (decisionToShow.done.data[0] === 1) {
        doneDecisionsCounter++;
        doneDecisions.push(decisionToShow);
      }
    }
    if (doneDecisionsCounter >= 3) {
      console.log('At least 3 decisions done');

      let doneDecisionsCriteria: any = [];

      let criteriaObservable = this.apiService.getSpecificDecisionCriteria(
        doneDecisions[0].id
      );
      criteriaObservable.subscribe((result) => {
        doneDecisionsCriteria.push(result);
      });

      for (let i = 1; i < doneDecisions.length; i++) {
        criteriaObservable = criteriaObservable.pipe(
          concatMap(() =>
            this.apiService.getSpecificDecisionCriteria(doneDecisions[i].id)
          )
        );
        criteriaObservable.subscribe((result) => {
          doneDecisionsCriteria.push(result);
          console.log('aquiiiiiiiiii: ', doneDecisionsCriteria, 'nloop: ', i);
        });
      }

      criteriaObservable.subscribe(() => {
        timer(200)
          .pipe(take(1))
          .subscribe(() => {
            console.log(doneDecisionsCriteria, criteriaIdArray);
            let samePreviousCriteria: any = []; //Array that stores all the previously used criteria in previous decisions

            for (let i = 0; i < criteriaIdArray.length; i++) {
              for (let j = 0; j < doneDecisionsCriteria.length; j++) {
                for (let k = 0; k < doneDecisionsCriteria[j].length; k++) {
                  if (
                    criteriaIdArray[i] ===
                    doneDecisionsCriteria[j][k].criterion_id
                  ) {
                    console.log(doneDecisionsCriteria[j][k]);
                    samePreviousCriteria.push([
                      i,
                      doneDecisionsCriteria[j][k].decision_id,
                      doneDecisionsCriteria[j][k].criterion_id,
                    ]);
                  }
                }
              }
            }
            //Following, organizes the ccriteria and checks for each criteria if it has been used more than 3 times
            console.log(samePreviousCriteria);
            let samePreviousCriteriaCounter: any = [];
            for (let i = 0; i < samePreviousCriteria.length; i++) {
              let criteriaRepeatedCheck = 0;
              for (let k = 0; k < samePreviousCriteriaCounter.length; k++) {
                if (
                  samePreviousCriteriaCounter[k][0] ===
                  samePreviousCriteria[i][2]
                ) {
                  criteriaRepeatedCheck = samePreviousCriteria[i][2];
                }
              }
              if (criteriaRepeatedCheck === 0) {
                samePreviousCriteriaCounter.push([
                  samePreviousCriteria[i][2],
                  1,
                ]);
              } else {
                for (let k = 0; k < samePreviousCriteriaCounter.length; k++) {
                  if (
                    samePreviousCriteriaCounter[k][0] ===
                    samePreviousCriteria[i][2]
                  ) {
                    samePreviousCriteriaCounter[k][1]++;
                  }
                }
              }
            }
            console.log('counter: ', samePreviousCriteriaCounter);

            //saves in criteriaToCheck the criterion that were used more than 3 times in previous decisions

            let criteriaToCheck: any = [];
            for (let i = 0; i < samePreviousCriteriaCounter.length; i++) {
              if (samePreviousCriteriaCounter[i][1] >= 3) {
                criteriaToCheck.push(samePreviousCriteriaCounter[i][0]);
              }
            }
            console.log(criteriaToCheck);

            // Get all the comparisons between alternatives for all the criterion in the criterionToCheck array

            let previousAlernativesPairwise: any = [];
            let alternativesCriteriaObservable =
              this.apiService.getSpecificParticipantDecisionAlternativesComparison(
                {
                  userId: this.userId,
                  criterionId: criteriaToCheck[0],
                }
              );
            alternativesCriteriaObservable.subscribe((result) => {
              for (let i = 0; i < result.length; i++) {
                previousAlernativesPairwise.push([
                  result[i].decision_id,
                  result[i].criterion_id,
                  result[i].alternative_1_id,
                  result[i].alternative_2_id,
                  result[i].pairwise_value,
                ]);
              }
            });

            for (let i = 1; i < criteriaToCheck.length; i++) {
              alternativesCriteriaObservable =
                alternativesCriteriaObservable.pipe(
                  concatMap(() =>
                    this.apiService.getSpecificParticipantDecisionAlternativesComparison(
                      {
                        userId: this.userId,
                        criterionId: criteriaToCheck[i],
                      }
                    )
                  )
                );
              alternativesCriteriaObservable.subscribe((result) => {
                for (let i = 0; i < result.length; i++) {
                  previousAlernativesPairwise.push([
                    result[i].decision_id,
                    result[i].criterion_id,
                    result[i].alternative_1_id,
                    result[i].alternative_2_id,
                    result[i].pairwise_value,
                  ]);
                }
              });
            }

            //associate the alternatives with their value and after with the pairwise value also (in the complete array)
            let firstColAltValues: any = [];
            let secondColAltValues: any = [];
            let completeFinalValsPairwise: any = [];
            alternativesCriteriaObservable.subscribe(() => {
              console.log('final result: ', previousAlernativesPairwise);
              this.apiService
                .getDecisionAlternativesCriterionValue()
                .subscribe((result) => {
                  for (let i = 0; i < previousAlernativesPairwise.length; i++) {
                    for (let j = 0; j < result.length; j++) {
                      if (
                        previousAlernativesPairwise[i][0] ===
                          result[j].decision_id &&
                        previousAlernativesPairwise[i][1] ===
                          result[j].criterion_id &&
                        previousAlernativesPairwise[i][2] ===
                          result[j].alternative_id
                      ) {
                        firstColAltValues.push(
                          result[j].alternative_criterion_value
                        );
                      }
                      if (
                        previousAlernativesPairwise[i][0] ===
                          result[j].decision_id &&
                        previousAlernativesPairwise[i][1] ===
                          result[j].criterion_id &&
                        previousAlernativesPairwise[i][3] ===
                          result[j].alternative_id
                      ) {
                        secondColAltValues.push(
                          result[j].alternative_criterion_value
                        );
                      }
                    }
                  }
                  for (let i = 0; i < firstColAltValues.length; i++) {
                    completeFinalValsPairwise.push([
                      previousAlernativesPairwise[i][1],
                      firstColAltValues[i],
                      secondColAltValues[i],
                      previousAlernativesPairwise[i][4],
                    ]);
                  }

                  //Get the current decision criteria alternatives comparison
                  for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < criteriaToCheck.length; j++) {
                      if (
                        result[i].decision_id === decisionId &&
                        result[i].criterion_id === criteriaToCheck[j]
                      ) {
                        alternativeCriteria.push(result[i]);
                      }
                    }
                  }

                  let comparisonsNumber =
                    alternativeCriteria.length / criteriaToCheck.length;
                  let first: any = [];
                  let second: any = [];

                  for (
                    let k = 0;
                    k < alternativeCriteria.length;
                    k = k + comparisonsNumber
                  ) {
                    for (let i = 0 + k; i < comparisonsNumber + k - 1; i++) {
                      for (let j = 0; j < comparisonsNumber + k - i - 1; j++) {
                        first.push(alternativeCriteria[i]);
                      }
                      for (let j = 1 + i; j < comparisonsNumber + k; j++) {
                        second.push(alternativeCriteria[j]);
                      }
                    }
                  }

                  console.log('alternativeCriteria: ', alternativeCriteria);
                  console.log(first);
                  console.log(second);
                  console.log(result);
                  console.log(firstColAltValues);
                  console.log(secondColAltValues);
                  console.log(
                    'Array final completa: ',
                    completeFinalValsPairwise
                  ); //array com o criterio, valores das alternativas e valor da pairwise comparison

                  let p: any = [];
                  let r: any = [];
                  let s: any = [];
                  for (let i = 0; i < 21; i++) {
                    p[i] = [
                      Math.sqrt(
                        completeFinalValsPairwise[i][1] *
                          completeFinalValsPairwise[i][2]
                      ),
                    ];
                    r[i] = [
                      completeFinalValsPairwise[i][2] /
                        completeFinalValsPairwise[i][1],
                    ];

                    s[i] = completeFinalValsPairwise[i][3]; // Array that keeps all the pairwise comparison values
                  }

                  // p = [[30], [65], [67], [73], [80]];
                  // r = [[2], [1.7], [0.5], [1.5], [1.86]];
                  // s = [[9], [3], [2], [7], [7]];

                  console.log('P: ', p);
                  console.log('R: ', r);
                  console.log('S: ', s);

                  const ones = math.ones([p.length, 1]);
                  console.log('ones: ', ones);
                  const DM: any = math.concat(
                    math.dotPow(p, 2),
                    p,
                    math.dotPow(r, 2),
                    r,
                    ones,
                    1
                  );
                  console.log('DM: ', DM);
                  const B = math.multiply(
                    math.inv(math.multiply(math.transpose(DM), DM)),
                    math.multiply(math.transpose(DM), s)
                  );

                  console.log(B);

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  //for each criteria understand if the values are inside the triagle

                  for (let i = 0; i < 3; i++) {
                    let points: any = [];
                    let stopForCicle = false;
                    for (let j = 0; j < 18; j++) {
                      points.push({
                        x: completeFinalValsPairwise[j][1],
                        y: completeFinalValsPairwise[j][2],
                      });
                    }
                    console.log(points);

                    let external_point: any = {
                      x: 1,
                      y: 3,
                    };

                    for (let i = 0; i < points.length; i++) {
                      if (stopForCicle) {
                        break;
                      }
                      for (let j = i + 1; j < points.length; j++) {
                        if (stopForCicle) {
                          break;
                        }
                        for (let k = j + 1; k < points.length; k++) {
                          let A = points[i];
                          let B = points[j];
                          let C = points[k];

                          let inTriangle = isPointInTriangle2D(
                            external_point,
                            A,
                            B,
                            C
                          );
                          if (inTriangle) {
                            console.log(
                              `Point (${external_point.x}, ${external_point.y}) is inside triangle (${A.x}, ${A.y}), (${B.x}, ${B.y}), (${C.x}, ${C.y})`
                            );
                            stopForCicle = true;
                            break;
                          }
                        }
                      }
                    }

                    function isPointInTriangle2D(
                      point: any,
                      A: any,
                      B: any,
                      C: any
                    ): boolean {
                      let lambda1 =
                        ((B.y - C.y) * (point.x - C.x) +
                          (C.x - B.x) * (point.y - C.y)) /
                        ((B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y));
                      let lambda2 =
                        ((C.y - A.y) * (point.x - C.x) +
                          (A.x - C.x) * (point.y - C.y)) /
                        ((B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y));
                      let lambda3 = 1 - lambda1 - lambda2;
                      return (
                        lambda1 >= 0 &&
                        lambda1 <= 1 &&
                        lambda2 >= 0 &&
                        lambda2 <= 1 &&
                        lambda3 >= 0 &&
                        lambda3 <= 1
                      );
                    }
                  }

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  const S = math.add(
                    math.add(
                      math.add(
                        math.add(
                          math.multiply(B[0], math.dotPow([75.102], 2)),
                          math.multiply(B[1], [75.102])
                        ),
                        math.multiply(B[2], math.dotPow([1.74408], 2))
                      ),
                      math.multiply(B[3], [1.74408])
                    ),
                    math.multiply(B[4], 1)
                  );

                  console.log(S);

                  //TODO:

                  //Falta traçar matriz e grafico para perceber valores
                  // perceber a fórmula e depois aplicar para cada uma das alternativas da decisao atual
                  //colocar tudo num array e mandar para o html para que as escolhas estejam feitas automaticamente
                });
            });
          });
      });
    } else {
      console.log('less than 3 decisions');
      //Doesn't do anything because there is not enough information to make a decision for user
    }
  }
  linspace(start: number, end: number, count: number): number[] {
    const step = (end - start) / (count - 1);
    return Array.from({ length: count }, (_, i) => start + step * i);
  }
}
