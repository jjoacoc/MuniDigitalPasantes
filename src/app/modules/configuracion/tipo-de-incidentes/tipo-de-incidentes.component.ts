import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-de-incidentes',
  templateUrl: './tipo-de-incidentes.component.html',
  styleUrls: ['./tipo-de-incidentes.component.css']
})
export class TipoDeIncidentesComponent {
  displayedColumns: string[] = ['select', 'areaDeServicio', 'tiposDeIncidentes', 'usuarios'];
  

  filtroGeneral: string = '';
  filtroUsuarios: string = '';
  cargoSeleccionado: string = 'Todos';
  habilitacionSeleccionada: string = 'Habilitados';

  // Datos de ejemplo para áreas de servicio


 

  cargos: string[] = ['Todos', 'Admin', 'Usuario', 'Operador'];  // Ejemplo de cargos


 



  // Filtro de usuarios (por ahora vacío)
  filtrarUsuarios() {
    // Lógica para filtrar usuarios
  }


}

