import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecisionSpecificationsService } from './decision-specifications.service';

const usersUrl = 'http://localhost:8080/users';
const criteriaUrl = 'http://localhost:8080/criteria';
const alternativesUrl = 'http://localhost:8080/alternatives';
const categoryUrl = 'http://localhost:8080/category';
const alternativesCriterionValueUrl =
  'http://localhost:8080/decision_alternatives_criterion_value';
const decisionUrl = 'http://localhost:8080/decision';
const decisionParticipantsUrl = 'http://localhost:8080/decision_participants';
const categoryCriteriaUrl = 'http://localhost:8080/category_criteria';
const decisionCriteriaUrl = 'http://localhost:8080/decision_criteria';
const decisionAlternativesUrl = 'http://localhost:8080/decision_alternatives';
const decisionCriteriaPairwiseUrl =
  'http://localhost:8080/decision_criteria_pairwise';
const decisionAlternativesPairwiseUrl =
  'http://localhost:8080/decision_alternatives_pairwise';
const participantDecisionFinalResultUrl =
  'http://localhost:8080/users_final_results';
const decisionFinalResultUrl = 'http://localhost:8080/decision_final_results';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private specsService: DecisionSpecificationsService
  ) {}

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Users

  getUsers() {
    return this.http.get<any>(usersUrl);
  }

  getSpecificUser(data: number) {
    return this.http.get<any>(`${usersUrl}/${data}`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Criteria

  getCriteria() {
    return this.http.get<any>(criteriaUrl);
  }

  getSpecificCriterion(data: number) {
    return this.http.get<any>(`${criteriaUrl}/${data}`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Category

  getCategories() {
    return this.http.get<any>(categoryUrl);
  }

  getSpecificCategory(data: number) {
    return this.http.get<any>(`${categoryUrl}/${data}`);
  }

  postCategory(data: { name: string }): any {
    return this.http.post<any>(categoryUrl, data);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Decision

  postDecision(data: { goal: string; category: string }): any {
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

  ///////////////////////////////////////////////////////////////////////////////////////////

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
    return this.http.post<any>(decisionParticipantsUrl, data);
  }

  updateSpecificDecisionParticipantsDone(data: {
    decisionId: number;
    participantsId: number;
  }) {
    return this.http.put<any>(decisionParticipantsUrl, data).subscribe();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //CategoryCriteria

  getSpecificCategoryCriteria(data: number) {
    return this.http.get<any>(`${categoryCriteriaUrl}/${data}`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //DecisionCriteria
  getSpecificDecisionCriteria(data: number) {
    return this.http.get<any>(`${decisionCriteriaUrl}/${data}`);
  }

  postSpecificDecisionCriteria(data: {
    decisionId: number;
    criteriaId: number;
  }) {
    return this.http.post<any>(decisionCriteriaUrl, data);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //DecisionAlternatives
  getSpecificDecisionAlternatives(data: number) {
    return this.http.get<any>(`${decisionAlternativesUrl}/${data}`);
  }

  postSpecificDecisionAlternative(data: {
    decisionId: number;
    alternativeId: number;
  }) {
    return this.http.post<any>(decisionAlternativesUrl, data);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //DecisionAlternativesCriterionValue

  getDecisionAlternativesCriterionValue() {
    return this.http.get<any>(alternativesCriterionValueUrl);
  }

  getSpecificDecisionAlternativesCriterionValue(data: number) {
    return this.http.get<any>(`${alternativesCriterionValueUrl}/${data}`);
  }

  postSpecificDecisionAlternativesCriterionValue(data: {
    decisionId: number;
    alternativeId: number;
    criterionId: number;
    alternativeCriterionValue: number;
  }) {
    return this.http.post<any>(alternativesCriterionValueUrl, data);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Alternatives parwise comparisons of a specific decision from a specific participant

  getSpecificParticipantDecisionAlternativesComparison(data: {
    userId: number;
    criterionId: number;
  }) {
    return this.http.get<any>(
      `${decisionAlternativesPairwiseUrl}/${data.userId}/${data.criterionId}`
    );
  }

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

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Final results of a specific decision from a specific participant

  getSpecificParticipantDecisionFinalResults(data: {
    decisionId: number;
    userId: number;
  }) {
    return this.http.get<any>(
      `${participantDecisionFinalResultUrl}/${data.decisionId}/${data.userId}`
    );
  }

  postSpecificParticipantDecisionFinalResults(data: {
    decisionId: number;
    userId: number;
    alternativeId: number;
    finalResult: number;
  }) {
    return this.http
      .post<any>(participantDecisionFinalResultUrl, data)
      .subscribe();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  //Final results of a specific decision

  getSpecificDecisionFinalResults(data: {
    decisionId: number;
    userId: number;
  }) {
    return this.http.get<any>(
      `${decisionFinalResultUrl}/${data.decisionId}/${data.userId}`
    );
  }

  postSpecificDecisionFinalResults(data: {
    decisionId: number;
    alternativeId: number;
    finalResult: number;
  }) {
    return this.http.post<any>(decisionFinalResultUrl, data).subscribe();
  }
}
