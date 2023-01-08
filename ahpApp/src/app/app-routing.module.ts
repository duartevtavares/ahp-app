import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DecisionSpecificationsFormComponent } from './components/decision/decision-specifications-form/decision-specifications-form.component';
import { DecisionComponent } from './components/decision/decision.component';
import { NewDecisionComponent } from './components/decision/new-decision/new-decision.component';
import { AdminHomePageComponent } from './components/welcome-page/admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './components/welcome-page/user-home-page/user-home-page.component';
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
  },
  {
    path: 'new-decision-component',
    component: NewDecisionComponent,
  },
  {
    path: 'admin-home-page-component',
    component: AdminHomePageComponent,
  },
  {
    path: 'user-home-page-component',
    component: UserHomePageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
