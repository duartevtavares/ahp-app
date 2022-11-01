import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionSpecificationsFormComponent } from './decision-specifications-form.component';

describe('DecisionSpecificationsFormComponent', () => {
  let component: DecisionSpecificationsFormComponent;
  let fixture: ComponentFixture<DecisionSpecificationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionSpecificationsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionSpecificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
