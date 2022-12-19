import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDecisionAlternativesComponent } from './new-decision-alternatives.component';

describe('NewDecisionAlternativesComponent', () => {
  let component: NewDecisionAlternativesComponent;
  let fixture: ComponentFixture<NewDecisionAlternativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDecisionAlternativesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDecisionAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
