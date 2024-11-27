import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-area-de-servicio',
  templateUrl: './area-de-servicio.component.html',
  styleUrls: ['./area-de-servicio.component.css']
})
export class AreaDeServicioComponent implements OnInit  {

  mostrarFormulario = false;
  AreasServicios: any[] = [];
  Columns: string[] = ['id', 'area','total', 'incidentTypes', 'actions'];

  //ACA TENGO UN ERROR 
 areaform:FormGroup 

  newAreaServicio: string = '';
  isModalOpen = false;


  // Función para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Función para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

    
  ngOnInit(): void {
    this.recuperarAreasServicios();
  }

  
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  //fin de la funcinalidad del modal

  constructor(private fb: FormBuilder, private database: DatabaseService) {

    this. areaform = this.fb.group({
      Descripcion: ['', Validators.required],
    })
  };

    // Método para recuperar la lista de incidentes de la base de datos
    recuperarAreasServicios() {
      this.database.recuperarAreaServicio().subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.AreasServicios = response;  // Aquí debes tener un array de objetos que contengan Id_Areas_Servicios y descripcion
          } else {
            console.error('La respuesta del servidor no es un array:', response);
            this.AreasServicios = [];
          }
        },
        error: (error) => {
          console.error('Error al recuperar areas:', error);
        }
      });
    }
    obtenerDescripcionAreaServicio(Id_Areas_Servicios: any): string {
      const AreaServicio = this.AreasServicios.find(
        (a) => a.Id_Areas_Servicios === Id_Areas_Servicios
      );
      return AreaServicio ? AreaServicio.Descripcion : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
    }

    
    submitForm() {
      if (this.areaform.valid) {
        const areaData = this.areaform.value;  // Se obtienen los valores del formulario
        console.log(areaData);
        this.database.altaAreaServicio(areaData).subscribe({
          next: (response) => {
            console.log('Respuesta del Servidor', response);
            if (response && response['message'] === 'OK') {
              alert('Area de Servicio creada con éxito');  // Se muestra un mensaje de éxito
              this.areaform.reset();  // Se resetea el formulario
              this.recuperarAreasServicios();  // Se actualiza la lista de Areas de Servicios
            } else {
              alert('Error al crear Area de Servicio: ' + (response['mensaje'] || 'Error desconocido'));
              
            }
            this.mostrarFormulario = !this.mostrarFormulario;  // Ocultar el formulario tras crear el Area de Servicio
          },
          error: (error) => {
            alert('Error al crear Area de Servicio');
            console.error('Error:', error);  // Se registra el error en la consola
          },
        });
      } else {
        alert('Por favor, completa todos los campos correctamente');
      }
    }

}
