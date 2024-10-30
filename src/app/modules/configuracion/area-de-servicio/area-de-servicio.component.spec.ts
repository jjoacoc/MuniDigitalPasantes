import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDeServicioComponent } from './area-de-servicio.component';

describe('AreaDeServicioComponent', () => {
  let component: AreaDeServicioComponent;
  let fixture: ComponentFixture<AreaDeServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaDeServicioComponent]
    });
    fixture = TestBed.createComponent(AreaDeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
