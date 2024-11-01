import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeIncidentesComponent } from './tipo-de-incidentes.component';

describe('TipoDeIncidentesComponent', () => {
  let component: TipoDeIncidentesComponent;
  let fixture: ComponentFixture<TipoDeIncidentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeIncidentesComponent]
    });
    fixture = TestBed.createComponent(TipoDeIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
