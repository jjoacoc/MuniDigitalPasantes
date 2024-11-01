import { Component } from '@angular/core';

@Component({
  selector: 'app-area-de-servicio',
  templateUrl: './area-de-servicio.component.html',
  styleUrls: ['./area-de-servicio.component.css']
})
export class AreaDeServicioComponent {
  displayedColumns: string[] = ['id', 'area', 'total', 'incidentTypes', 'actions'];
  

}
