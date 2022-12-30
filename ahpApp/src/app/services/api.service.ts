import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) {}

  //Participants

  postParticipant(data: string) {
    return this.http.post<any>(participantsUrl, data);
  }

  getParticipants() {
    return this.http.get<any>(participantsUrl);
  }

  getSpecificParticipant(data: number) {
    return this.http.get<any>(`${participantsUrl}/${data}`);
  }

  //Users

  getUsers() {
    return this.http.get<any>(usersUrl);
  }

  //Criteria

  getCriteria() {
    return this.http.get<any>(criteriaUrl);
  }

  //Decision

  postDecision(data: string) {
    return this.http.post<any>(decisionUrl, data);
  }

  getDecision() {
    return this.http.get<any>(decisionUrl);
  }

  getSpecificDecision(data: number) {
    return this.http.get<any>(`${decisionUrl}/${data}`);
  }

  ///////////////////////////////////////////////

  //DecisionParticipants
  getSpecificDecisionParticipantsByDecisionId(data: number) {
    return this.http.get<any>(`${decisionParticipantsUrl}/${data}`);
  }

  postSpecificDecisionParticipantsByParticipantId(data: {
    decisionId: number;
    participantsId: number;
    participantWeight: number;
  }) {
    return this.http.post<any>(decisionParticipantsUrl, data).subscribe();
  }

  //DecisionCriteria
  getSpecificDecisionCriteria(data: number) {
    return this.http.get<any>(`${decisionParticipantsUrl}/${data}`);
  }

  //DecisionAlternatives
  getSpecificDecisionAlternatives(data: number) {
    return this.http.get<any>(`${decisionParticipantsUrl}/${data}`);
  }
}
