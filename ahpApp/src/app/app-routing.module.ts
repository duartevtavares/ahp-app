import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DecisionSpecificationsFormComponent } from './components/decision/decision-specifications-form/decision-specifications-form.component';
import { DecisionComponent } from './components/decision/decision.component';
import { NewDecisionComponent } from './components/decision/new-decision/new-decision.component';

const routes: Routes = [
  { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  {
    path: 'decision-specifications-form',
    component: DecisionSpecificationsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
