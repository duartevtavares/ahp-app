import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DecisionSpecificationsService } from 'src/app/services/decision-specifications.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private specsService: DecisionSpecificationsService
  ) {}

  ngOnInit(): void {}

  deleteProgress() {
    this.specsService.decisionSpecs = 0;
    this.specsService.participants = 0;
  }
}
