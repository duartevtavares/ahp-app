import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DecisionSpecificationsFormComponent } from './components/decision/decision-specifications-form/decision-specifications-form.component';
import { DecisionComponent } from './components/decision/decision.component';
import { NewDecisionComponent } from './components/decision/new-decision/new-decision.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page/welcome-page.component';
import { AuthorizedGuard } from './guard/authorized.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomePageComponent },
  {
    path: 'decision-specifications-form',
    component: DecisionSpecificationsFormComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'decision-component',
    component: DecisionComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'new-decision-component',
    component: NewDecisionComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
