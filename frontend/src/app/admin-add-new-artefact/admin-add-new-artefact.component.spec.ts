import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewArtefactComponent } from './admin-add-new-artefact.component';

describe('AdminAddNewArtefactComponent', () => {
  let component: AdminAddNewArtefactComponent;
  let fixture: ComponentFixture<AdminAddNewArtefactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddNewArtefactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddNewArtefactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
