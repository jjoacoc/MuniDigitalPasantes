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
  displayedColumns: string[] = ['id', 'area','total', 'incidentTypes', 'actions']
  areaServicio:any [] = [1, "tusam", "100", "Bomberos", "bor"]

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

  
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  //fin de la funcinalidad del modal


// Función para manejar el submit del formulario
onSubmit() {
  if (this.newAreaServicio) {
    console.log('Nuevo grupo:', this.newAreaServicio);
    // Aquí puedes agregar la lógica para enviar el nuevo grupo a tu servicio
    this.closeModal(); // Cierra el modal después de guardar
  } else {
    alert('Por favor, ingresa un nombre de grupo.');
  }
}
//fin de la funcinalidad del modal


 

  
  
  constructor(private fb: FormBuilder, private database: DatabaseService) {

  this. areaform = this.fb.group({
    Descripcion: ['', Validators.required],
    Id_Tipos_Incidentes: ['', Validators.required],
  })
};
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

    
    submitForm() {
      if (this.areaform.valid) {
        const rolData = this.areaform.value;  // Se obtienen los valores del formulario
        this.database.altaGrupo(rolData).subscribe({
          next: (response) => {
            if (response && response['resultado'] === 'OK') {
              alert('Rol creado con éxito');  // Se muestra un mensaje de éxito
              this.areaform.reset();  // Se resetea el formulario
              this.recuperarAreasServicios();  // Se actualiza la lista de grupos
            } else {
              alert('Error al crear grupo: ' + (response['mensaje'] || 'Error desconocido'));
              
            }
            this.mostrarFormulario = !this.mostrarFormulario;  // Ocultar el formulario tras crear el grupo
          },
          error: (error) => {
            alert('Error al crear grupo');
            console.error('Error:', error);  // Se registra el error en la consola
          },
        });
      } else {
        alert('Por favor, completa todos los campos correctamente');
      }
    }





    
  ngOnInit(): void {
    this.recuperarAreasServicios();
  }

}
