import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecisionSpecificationsService } from './decision-specifications.service';

const participantsUrl = 'http://localhost:8080/participants';
const usersUrl = 'http://localhost:8080/users';
const criteriaUrl = 'http://localhost:8080/criteria';
const alternativesUrl = 'http://localhost:8080/alternatives';
const alternativesCriterionValueUrl =
  'http://localhost:8080/decision_alternatives_criterion_value';
const decisionUrl = 'http://localhost:8080/decision';
const decisionParticipantsUrl = 'http://localhost:8080/decision_participants';
const decisionCriteriaUrl = 'http://localhost:8080/decision_criteria';
const decisionAlternativesUrl = 'http://localhost:8080/decision_alternatives';
const decisionCriteriaPairwiseUrl =
  'http://localhost:8080/decision_criteria_pairwise';
const decisionAlternativesPairwiseUrl =
  'http://localhost:8080/decision_alternatives_pairwise';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private specsService: DecisionSpecificationsService
  ) {}

  //Participants

  // postParticipant(data: string) {
  //   return this.http.post<any>(participantsUrl, data).subscribe();
  // }

  // getParticipants() {
  //   return this.http.get<any>(participantsUrl);
  // }

  // getSpecificParticipant(data: number) {
  //   return this.http.get<any>(`${participantsUrl}/${data}`);
  // }

  //Users

  getUsers() {
    return this.http.get<any>(usersUrl);
  }

  getSpecificUser(data: number) {
    return this.http.get<any>(`${usersUrl}/${data}`);
  }

  //Criteria

  getCriteria() {
    return this.http.get<any>(criteriaUrl);
  }

  getSpecificCriterion(data: number) {
    return this.http.get<any>(`${criteriaUrl}/${data}`);
  }

  //Alternatives

  getAlternatives() {
    return this.http.get<any>(alternativesUrl);
  }

  getSpecificAlternative(data: number) {
    return this.http.get<any>(`${alternativesUrl}/${data}`);
  }

  postAlternative(data: { name: string }): any {
    return this.http.post<any>(alternativesUrl, data);
  }

  //Decision

  postDecision(data: { name: string; goal: string }): any {
    return this.http.post<any>(decisionUrl, data);
  }

  getDecisions() {
    return this.http.get<any>(decisionUrl);
  }

  getSpecificDecision(data: number) {
    return this.http.get<any>(`${decisionUrl}/${data}`);
  }

  updateSpecificDecisionDone(data: { decisionId: number }): any {
    return this.http.put<any>(decisionUrl, data);
  }

  ///////////////////////////////////////////////

  //DecisionParticipants
  getSpecificDecisionParticipantsByDecisionId(data: number) {
    return this.http.get<any>(`${decisionParticipantsUrl}/decision/${data}`);
  }

  getSpecificDecisionParticipantsByUserId(data: number) {
    return this.http.get<any>(`${decisionParticipantsUrl}/participant/${data}`);
  }

  postSpecificDecisionParticipants(data: {
    decisionId: any;
    participantsId: number;
    participantWeight: number;
  }) {
    return this.http.post<any>(decisionParticipantsUrl, data).subscribe();
  }

  updateSpecificDecisionParticipantsDone(data: {
    decisionId: number;
    participantsId: number;
  }) {
    return this.http.put<any>(decisionParticipantsUrl, data).subscribe();
  }

  //DecisionCriteria
  getSpecificDecisionCriteria(data: number) {
    return this.http.get<any>(`${decisionCriteriaUrl}/${data}`);
  }

  postSpecificDecisionCriteria(data: {
    decisionId: number;
    criteriaId: number;
  }) {
    return this.http.post<any>(decisionCriteriaUrl, data).subscribe();
  }

  //DecisionAlternatives
  getSpecificDecisionAlternatives(data: number) {
    return this.http.get<any>(`${decisionAlternativesUrl}/${data}`);
  }

  postSpecificDecisionAlternative(data: {
    decisionId: number;
    alternativeId: number;
  }) {
    return this.http.post<any>(decisionAlternativesUrl, data).subscribe();
  }

  //DecisionAlternativesCriterionValue
  getSpecificDecisionAlternativesCriterionValue(data: number) {
    return this.http.get<any>(`${alternativesCriterionValueUrl}/${data}`);
  }

  postSpecificDecisionAlternativesCriterionValue(data: {
    decisionId: number;
    alternativeId: number;
    criterionId: number;
    alternativeCriterionValue: number;
  }) {
    return this.http.post<any>(alternativesCriterionValueUrl, data).subscribe();
  }

  //Criteria parwise comparisons of a specific decision from a specific participant

  getSpecificParticipantDecisionCriteriaComparison(data: {
    decisionId: number;
    userId: number;
  }) {
    return this.http.get<any>(
      `${decisionCriteriaPairwiseUrl}/${data.decisionId}/${data.userId}`
    );
  }

  postSpecificParticipantDecisionCriteriaComparison(data: {
    decisionId: number;
    userId: number;
    criterion1Id: number;
    criterion2Id: number;
    pairwiseValue: number;
  }) {
    return this.http.post<any>(decisionCriteriaPairwiseUrl, data).subscribe();
  }

  //Alternatives parwise comparisons of a specific decision from a specific participant

  postSpecificParticipantDecisionAlternativesComparison(data: {
    decisionId: number;
    userId: number;
    criterionId: number;
    alternative1Id: number;
    alternative2Id: number;
    pairwiseValue: number;
  }) {
    return this.http
      .post<any>(decisionAlternativesPairwiseUrl, data)
      .subscribe();
  }
}
