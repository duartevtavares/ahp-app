import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DecisionComponent } from './components/decision/decision.component';
import { NewDecisionComponent } from './components/decision/new-decision/new-decision.component';

const routes: Routes = [
  { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'new-decision', component: NewDecisionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
