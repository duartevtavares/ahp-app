import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DecisionSpecificationsService {
  decisionSpecs: any;
  decisionCriteria: any;
  decisionAlternativesNames: any;
  decisionAlternativesIds: any;
  participants: any;
  participantsNames: any = [];
  decisionId: any;
  participantsSelected: boolean = false;
}
