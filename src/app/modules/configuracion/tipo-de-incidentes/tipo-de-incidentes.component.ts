import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-tipo-de-incidentes',
  templateUrl: './tipo-de-incidentes.component.html',
  styleUrls: ['./tipo-de-incidentes.component.css']
})
export class TipoDeIncidentesComponent implements OnInit {


  filtradoActivo = false;

  displayedColumns: string[] = ['select', 'area', 'incidents', 'users'];
  AreasServicios: any[] = []; // Variable para almacenar las areas de servicio recuperados de la base de datos
  areaServicio:any [] = [1, "tusam", "100", "Bomberos", "bor"]
  



  
  constructor(private database: DatabaseService) {}
    // Método para recuperar la lista de incidentes de la base de datos
    recuperarAreasServicios() {
      this.database.recuperarAreasServicios().subscribe({
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

      // Filtra incidentes según el área de servicio
  filtrarTIncidentes(Id_Areas_Servicios: any):string {
    this.filtradoActivo = true;
    const AreaServicio = this.AreasServicios.find(
      (a) => a.Id_Areas_Servicios === Id_Areas_Servicios);
      return AreaServicio ? AreaServicio.Descripcion : 'No Existe';
  }
    // Restaura la tabla completa
    refrescarTabla() {
      this.filtradoActivo = false;
      this.AreasServicios = this.AreasServicios;
    }
    
  ngOnInit(): void {
    this.recuperarAreasServicios();
  }

  filtrarUsuarios(){}

  cargo = [
    { name: 'CALIDAD MUNIDIGITAL' },
    { name: 'CONFIGURADOR MUNIDIGITAL' },
    { name: 'IMPLEMENTADOR MUNIDIGITAL' },
    { name: 'OPERARIO 109' },
    { name: 'OPERARIO 147' },
    { name: 'SIN ASIGNAAR - CIPOLLETTI' }
  ];
}

