import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewDecisionComponent } from '../new-decision/new-decision.component';
import { DecisionSpecificationsFormComponent } from './decision-specifications-form.component';

@NgModule({
  declarations: [NewDecisionComponent, DecisionSpecificationsFormComponent],
  imports: [CommonModule],
})
export class DecisionSpecificationsFormModule {}
