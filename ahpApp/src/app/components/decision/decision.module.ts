import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DecisionSpecificationsFormComponent } from './decision-specifications-form/decision-specifications-form.component';
import { DecisionComponent } from './decision.component';
import { NewDecisionComponent } from './new-decision/new-decision.component';
import { ParticipantsDialogComponent } from './participants-dialog/participants-dialog.component';
import { ParticipantsTableComponent } from './participants-table/participants-table.component';

@NgModule({
  declarations: [
    DecisionComponent,
    ParticipantsTableComponent,
    ParticipantsDialogComponent,
    NewDecisionComponent,
    DecisionSpecificationsFormComponent,
  ],
  imports: [CommonModule],
})
export class DecisionModule {}
