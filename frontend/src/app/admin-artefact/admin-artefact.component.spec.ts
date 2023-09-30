import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtefactComponent } from './admin-artefact.component';

describe('AdminArtefactComponent', () => {
  let component: AdminArtefactComponent;
  let fixture: ComponentFixture<AdminArtefactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtefactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArtefactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
