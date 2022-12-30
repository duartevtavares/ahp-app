import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginPermissionServiceService } from 'src/app/services/login-permission-service.service';

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
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = this.permissionService.userId;
    console.log(this.userId);

    this.apiService;
    //   .getSpecificDecisionParticipants(1)
    //   .subscribe((result) => console.log(result));

    this.apiService
      .getSpecificDecisionParticipantsByDecisionId(this.userId)
      .subscribe((result) => {
        this.userDecisions = result;
        console.log('as decisões deste user: ', this.userDecisions);

        this.getparticipantDecisions(this.userDecisions);
      });
  }

  getparticipantDecisions(decisions: any[]) {
    for (let i = 0; i < decisions.length; i++) {
      this.apiService
        .getSpecificDecision(this.userDecisions[i].decision_id)
        .subscribe((result) => {
          this.decisionsToShow.push(result);
        });
    }
    console.log('para mostrar: ', this.decisionsToShow);
  }
}
