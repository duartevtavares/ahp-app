import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DecisionComponent } from './components/decision/decision.component';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DecisionSpecificationsFormComponent } from './components/decision/decision-specifications-form/decision-specifications-form.component';
import { NewDecisionAlternativesComponent } from './components/decision/new-decision-alternatives/new-decision-alternatives/new-decision-alternatives.component';
import { NewDecisionComponent } from './components/decision/new-decision/new-decision.component';
import { ParticipantsDialogComponent } from './components/decision/participants-dialog/participants-dialog.component';
import { ParticipantsTableComponent } from './components/decision/participants-table/participants-table.component';
import { AlertComponent } from './components/shared/alert-component/alert-component.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page/welcome-page.component';
import { ApiService } from './services/api.service';
import { DecisionSpecificationsService } from './services/decision-specifications.service';
import { MathService } from './services/math.service';
import { AdminHomePageComponent } from './components/welcome-page/admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './components/welcome-page/user-home-page/user-home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DecisionComponent,
    ParticipantsTableComponent,
    ParticipantsDialogComponent,
    NewDecisionComponent,
    DecisionSpecificationsFormComponent,
    NewDecisionAlternativesComponent,
    AlertComponent,
    WelcomePageComponent,
    AdminHomePageComponent,
    UserHomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    NgxChartsModule,
    HttpClientModule,
  ],
  providers: [ApiService, DecisionSpecificationsService, MathService],
  bootstrap: [AppComponent],
})
export class AppModule {}
