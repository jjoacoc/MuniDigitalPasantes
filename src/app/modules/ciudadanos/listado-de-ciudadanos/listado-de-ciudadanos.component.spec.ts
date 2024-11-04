import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeCiudadanosComponent } from './listado-de-ciudadanos.component';

describe('ListadoDeCiudadanosComponent', () => {
  let component: ListadoDeCiudadanosComponent;
  let fixture: ComponentFixture<ListadoDeCiudadanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoDeCiudadanosComponent]
    });
    fixture = TestBed.createComponent(ListadoDeCiudadanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
