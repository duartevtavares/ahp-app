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
                  let lengthOfEachCriteria: any = [];
                  let cnt = 0;
                  for (let i = 0; i < criteriaToCheck.length; i++) {
                    lengthOfEachCriteria[i] = 0;
                  }
                  for (let i = 0; i < firstColAltValues.length; i++) {
                    if (i === 0) {
                      lengthOfEachCriteria[cnt]++;
                    } else if (
                      i !== 0 &&
                      previousAlernativesPairwise[i][1] ===
                        previousAlernativesPairwise[i - 1][1]
                    ) {
                      lengthOfEachCriteria[cnt]++;
                    } else if (
                      i !== 0 &&
                      previousAlernativesPairwise[i][1] !==
                        previousAlernativesPairwise[i - 1][1]
                    ) {
                      cnt++;
                      lengthOfEachCriteria[cnt]++;
                    }
                    completeFinalValsPairwise.push([
                      previousAlernativesPairwise[i][1], //criterion_id
                      firstColAltValues[i],
                      secondColAltValues[i],
                      previousAlernativesPairwise[i][4],
                    ]);
                  }
                  console.log(
                    'number and length of criteria: ',
                    lengthOfEachCriteria
                  );

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
                  let finalComparisonNumber =
                    math.factorial(comparisonsNumber) /
                    (math.factorial(2) * math.factorial(comparisonsNumber - 2));
                  console.log('Number of comparisons: ', finalComparisonNumber);
                  console.log(first);
                  console.log(second);
                  console.log(result);
                  console.log(firstColAltValues);
                  console.log(secondColAltValues);
                  console.log(
                    'Array final completa: ',
                    completeFinalValsPairwise
                  ); //array com o criterio, valores das alternativas e valor da pairwise comparison

                  let rightOrderCompleteFinalValsPairwise: any = [];
                  for (let i = 0; i < completeFinalValsPairwise.length; i++) {
                    if (
                      completeFinalValsPairwise[i][1] >
                      completeFinalValsPairwise[i][2]
                    ) {
                      let criterionId = completeFinalValsPairwise[i][0];
                      let firstComparisonValue =
                        completeFinalValsPairwise[i][1];
                      let secondComparisonValue =
                        completeFinalValsPairwise[i][2];
                      let pairwiseNewValue =
                        5 - (completeFinalValsPairwise[i][3] - 5);
                      let orderChanged = 1;
                      rightOrderCompleteFinalValsPairwise.push([
                        criterionId,
                        secondComparisonValue,
                        firstComparisonValue,
                        pairwiseNewValue,
                        orderChanged,
                      ]);
                    } else {
                      rightOrderCompleteFinalValsPairwise.push([
                        completeFinalValsPairwise[i][0],
                        completeFinalValsPairwise[i][1],
                        completeFinalValsPairwise[i][2],
                        completeFinalValsPairwise[i][3],
                        0,
                      ]);
                    }
                  }
                  console.log(
                    'Com a ordem correta: ',
                    rightOrderCompleteFinalValsPairwise
                  );

                  let p: any = [];
                  let r: any = [];
                  let s: any = [];
                  // for (let i = 0; i < criteriaToCheck.length; i++) {
                  //   p.push([]);
                  //   r.push([]);
                  //   s.push([]);

                  //   for (let j = 0; j < lengthOfEachCriteria[i]; j++) {
                  //     p[i][j] = 0;
                  //     r[i][j] = 0;
                  //     s[i][j] = 0;
                  //   }
                  // }
                  let B;
                  let BArray: any = [];
                  let insideTriangleArray: any = [];
                  let lengthOfEachCriteriaCounter = 0;
                  let SArray: any = [];
                  for (let i = 0; i < criteriaToCheck.length; i++) {
                    p = [];
                    r = [];
                    s = [];
                    if (i > 0) {
                      lengthOfEachCriteriaCounter +=
                        lengthOfEachCriteria[i - 1];
                    }

                    for (let j = 0; j < lengthOfEachCriteria[i]; j++) {
                      console.log(lengthOfEachCriteria[i]);

                      p[j] = [
                        Math.sqrt(
                          rightOrderCompleteFinalValsPairwise[
                            j + lengthOfEachCriteriaCounter
                          ][1] *
                            rightOrderCompleteFinalValsPairwise[
                              j + lengthOfEachCriteriaCounter
                            ][2]
                        ),
                      ];
                      r[j] = [
                        rightOrderCompleteFinalValsPairwise[
                          j + lengthOfEachCriteriaCounter
                        ][2] /
                          rightOrderCompleteFinalValsPairwise[
                            j + lengthOfEachCriteriaCounter
                          ][1],
                      ];

                      s[j] =
                        rightOrderCompleteFinalValsPairwise[
                          j + lengthOfEachCriteriaCounter
                        ][3]; // Array that keeps all the pairwise comparison values
                    }

                    console.log('P: ', p);
                    console.log('R: ', r);
                    console.log('S: ', s);

                    const ones = math.ones([p.length, 1]);
                    //console.log('ones: ', ones);
                    const DM: any = math.concat(
                      math.dotPow(p, 2),
                      p,
                      math.dotPow(r, 2),
                      r,
                      ones,
                      1
                    );
                    console.log('DM: ', DM);
                    B = math.multiply(
                      math.inv(math.multiply(math.transpose(DM), DM)),
                      math.multiply(math.transpose(DM), s)
                    );

                    BArray[i] = B;
                    console.log('BArray: ', BArray);

                    console.log(B);
                    console.log('contador: ', lengthOfEachCriteriaCounter);

                    //console.log(B);

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //for each criteria understand if the values are inside the triagle

                    //Still missing how to do it for different criteria - change number 3
                    // for (let i = 0; i < criteriaToCheck; i++) {
                    let points: any = [];
                    let stopForCicle = false;
                    for (let j = 0; j < lengthOfEachCriteria[i]; j++) {
                      let past_p =
                        rightOrderCompleteFinalValsPairwise[
                          j + lengthOfEachCriteriaCounter
                        ][1];
                      let past_r =
                        rightOrderCompleteFinalValsPairwise[
                          j + lengthOfEachCriteriaCounter
                        ][2];

                      points.push({
                        x: Math.sqrt(past_p * past_r),
                        y: past_r / past_p,
                      });
                    }
                    console.log('points: ', points);
                    insideTriangleArray.push([]);

                    let columnValueOrderChanged = 0;

                    for (let n = 0; n < finalComparisonNumber; n++) {
                      let currentFirstValue =
                        first[n + finalComparisonNumber * i]
                          .alternative_criterion_value;
                      let currentSecondValue =
                        second[n + finalComparisonNumber * i]
                          .alternative_criterion_value;
                      let finalFirstValue;
                      let finalSecondValue;

                      columnValueOrderChanged = 0;

                      if (currentFirstValue > currentSecondValue) {
                        finalFirstValue = currentSecondValue;
                        finalSecondValue = currentFirstValue;
                        columnValueOrderChanged = 1;
                      } else {
                        finalFirstValue = currentFirstValue;
                        finalSecondValue = currentSecondValue;
                        columnValueOrderChanged = 0;
                      }

                      let external_point: any = {
                        x: Math.sqrt(finalFirstValue * finalSecondValue),
                        y: finalSecondValue / finalFirstValue,
                      };
                      stopForCicle = false;

                      console.group('external point: ', external_point);

                      for (let k = 0; k < points.length; k++) {
                        if (stopForCicle) {
                          break;
                        }
                        for (let l = k + 1; l < points.length; l++) {
                          if (stopForCicle) {
                            break;
                          }
                          for (let m = l + 1; m < points.length; m++) {
                            let A = points[k];
                            let B = points[l];
                            let C = points[m];

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

                              insideTriangleArray[i][n] = 1;

                              let S = math.add(
                                math.add(
                                  math.add(
                                    math.add(
                                      math.multiply(
                                        BArray[i][0],
                                        math.dotPow([external_point.x], 2)
                                      ),
                                      math.multiply(BArray[i][1], [
                                        external_point.x,
                                      ])
                                    ),
                                    math.multiply(
                                      BArray[i][2],
                                      math.dotPow([external_point.y], 2)
                                    )
                                  ),
                                  math.multiply(BArray[i][3], [
                                    external_point.y,
                                  ])
                                ),
                                math.multiply(BArray[i][4], 1)
                              );
                              let S_new;

                              if (columnValueOrderChanged === 1) {
                                S_new = 5 - (S - 5);
                                //console.log(S);
                              } else {
                                S_new = S;
                              }

                              console.log('S antigo: ', S);
                              console.log('RESULTADO FINALISSIMO: ', S_new);

                              if (columnValueOrderChanged === 1) {
                                SArray.push([
                                  finalSecondValue,
                                  finalFirstValue,
                                  math.round(S_new),
                                ]);
                              } else {
                                SArray.push([
                                  finalFirstValue,
                                  finalSecondValue,
                                  math.round(S[0]),
                                ]);
                              }

                              break;
                            }
                          }
                          //  }
                        }
                      }
                      if (!stopForCicle) {
                        console.log(
                          `Point (${external_point.x}, ${external_point.y}) is not inside any triangle`
                        );
                        SArray.push([finalSecondValue, finalFirstValue, 0]);
                        insideTriangleArray[i][n] = 0;
                      }
                    }
                  }
                  console.log(SArray);
                  this.newDecisionService.predictedPairwiseValue = SArray;
                  console.log(
                    'number of comparisons and criteria:',
                    lengthOfEachCriteriaCounter
                  );
                  console.log(
                    'array that shows if points from different criteria are inside a triangle: ',
                    insideTriangleArray
                  );

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

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                  //TODO:

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
