import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewDecisionService {
  userId: any;
  decisionCriteria: any;
  decisionCriteriaId: any = [];
  decisionAlternatives: any;
  decisionAlternativesId: any = [];
  decisionIntro: any;
  alternativesCriteriaValues: number[] = [];
}
