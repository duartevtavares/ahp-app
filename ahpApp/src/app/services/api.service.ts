import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecisionSpecificationsService } from './decision-specifications.service';

const participantsUrl = 'http://localhost:8080/participants';
const usersUrl = 'http://localhost:8080/users';
const criteriaUrl = 'http://localhost:8080/criteria';
const decisionUrl = 'http://localhost:8080/decision';
const decisionParticipantsUrl = 'http://localhost:8080/decision_participants';
const decisionCriteriaUrl = 'http://localhost:8080/decision_criteria';
const decisionAlternativesUrl = 'http://localhost:8080/decision_alternatives';

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

  //Criteria

  getCriteria() {
    return this.http.get<any>(criteriaUrl);
  }

  // postCriteria(data: { decisionId: number; criteriaId: number }): any {
  //   this.http.post<any>(criteriaUrl, data).subscribe((result) => {
  //     this.specsService.decisionId = result.id;
  //   });
  // }

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
    alternativesId: number;
    alternativeValue: number;
  }) {
    return this.http.post<any>(decisionAlternativesUrl, data).subscribe();
  }
}
