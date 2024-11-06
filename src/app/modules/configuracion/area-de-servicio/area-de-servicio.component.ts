import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-area-de-servicio',
  templateUrl: './area-de-servicio.component.html',
  styleUrls: ['./area-de-servicio.component.css']
})
export class AreaDeServicioComponent implements OnInit  {
  AreasServicios: any[] = [];
  displayedColumns: string[] = ['id', 'area','total', 'incidentTypes', 'actions']
  areaServicio:any [] = [1, "tusam", "100", "Bomberos", "bor"]
  
  
  constructor(private fb: FormBuilder, private database: DatabaseService) {}
    // Método para recuperar la lista de incidentes de la base de datos
    recuperarAreasServicios() {
      this.database.recuperarAreaServicio().subscribe({
        next: (response) => {
          // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'incidentes'
          if (Array.isArray(response)) {
            this.AreasServicios = response; // Asigna los incidentes recibidos
          } else {
            console.error('La respuesta del servidor no es un array:', response); // Muestra error si no es un array
            this.AreasServicios = []; // Si la respuesta no es válida, se asigna un array vacío
          }
        },
        error: (error) => {
          // En caso de error al recuperar los incidentes, se registra en la consola
          console.error('Error al recuperar incidentes:', error);
        },
      });
    }
    obtenerDescripcionAreaServicio(Id_Areas_Servicios: any): string {
      const AreaServicio = this.AreasServicios.find(
        (a) => a.Id_Areas_Servicios === Id_Areas_Servicios
      );
      return AreaServicio ? AreaServicio.Descripcion : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
    }

    
  ngOnInit(): void {
    this.recuperarAreasServicios();
  }

}
