import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DecisionSpecificationsFormComponent } from './decision-specifications-form/decision-specifications-form.component';
import { DecisionComponent } from './decision.component';
import { NewDecisionComponent } from './new-decision/new-decision.component';
import { ParticipantsDialogComponent } from './participants-dialog/participants-dialog.component';
import { ParticipantsTableComponent } from './participants-table/participants-table.component';
import { NewDecisionAlternativesComponent } from './new-decision-alternatives/new-decision-alternatives/new-decision-alternatives.component';

@NgModule({
  declarations: [
    DecisionComponent,
    ParticipantsTableComponent,
    ParticipantsDialogComponent,
    NewDecisionComponent,
    DecisionSpecificationsFormComponent,
    NewDecisionAlternativesComponent,
  ],
  imports: [CommonModule],
})
export class DecisionModule {}
