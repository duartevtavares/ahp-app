import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';

@Component({
  selector: 'admin-home-page-component',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {
  allDecisions: any;
  allDecisionsName: any;
  constructor(
    private specsService: DecisionSpecificationsService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getDecisions().subscribe((result) => {
      this.allDecisions = result;
      console.log(this.allDecisions);
    });
  }
  showDecision(decision: any) {
    console.log(decision);
    this.apiService
      .getSpecificDecisionParticipantsByDecisionId(decision.id)
      .subscribe((result) => {
        console.log(result);
      });
    this.apiService
      .getSpecificDecisionCriteria(decision.id)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
