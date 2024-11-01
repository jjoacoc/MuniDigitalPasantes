import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-de-incidentes',
  templateUrl: './tipo-de-incidentes.component.html',
  styleUrls: ['./tipo-de-incidentes.component.css']
})
export class TipoDeIncidentesComponent {
  displayedColumns: string[] = ['select', 'area', 'incidents', 'users'];
  serviceAreas = [
    { name: 'Alumbrado Público' },
    { name: 'ARSA' },
    { name: 'ASUNTOS VECINALES' },
    { name: 'BOMBEROS' },
    { name: 'Capacitación y Empleo' },
    { name: 'Comercio' },
    { name: 'Complejo cultural' },
    { name: 'Cooperativa' }
  ];
}

