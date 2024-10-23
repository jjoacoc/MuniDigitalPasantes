import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIncidentesComponent } from './registro-incidentes.component';

describe('RegistroIncidentesComponent', () => {
  let component: RegistroIncidentesComponent;
  let fixture: ComponentFixture<RegistroIncidentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroIncidentesComponent]
    });
    fixture = TestBed.createComponent(RegistroIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
