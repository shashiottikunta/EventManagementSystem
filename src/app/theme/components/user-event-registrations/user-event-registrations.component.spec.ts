import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventRegistrationsComponent } from './user-event-registrations.component';

describe('UserEventRegistrationsComponent', () => {
  let component: UserEventRegistrationsComponent;
  let fixture: ComponentFixture<UserEventRegistrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEventRegistrationsComponent]
    });
    fixture = TestBed.createComponent(UserEventRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
