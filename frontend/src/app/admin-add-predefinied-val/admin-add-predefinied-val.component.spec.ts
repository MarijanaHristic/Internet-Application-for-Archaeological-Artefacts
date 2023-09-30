import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPredefiniedValComponent } from './admin-add-predefinied-val.component';

describe('AdminAddPredefiniedValComponent', () => {
  let component: AdminAddPredefiniedValComponent;
  let fixture: ComponentFixture<AdminAddPredefiniedValComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddPredefiniedValComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPredefiniedValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
