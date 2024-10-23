import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DatabaseService } from '../../services/database.service';
//import { ApiService } from '../../servis/api.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  isModalOpen = false;
  newGroupName: string = '';
  //principo de la funcionalidad del modal 
  // Función para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Función para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Función para manejar el submit del formulario
  onSubmit() {
    if (this.newGroupName) {
      console.log('Nuevo grupo:', this.newGroupName);
      // Aquí puedes agregar la lógica para enviar el nuevo grupo a tu servicio
      this.closeModal(); // Cierra el modal después de guardar
    } else {
      alert('Por favor, ingresa un nombre de grupo.');
    }
  }
  //fin de la funcinalidad del modal

  
  
  // Formulario reactivo para manejar los datos del grupo
  rolForm: FormGroup;  
  grupos: any[] = [];  // Variable para almacenar los grupos recuperados de la base de datos

  modificarRolForm: FormGroup;  // Formulario para modificar un grupo
  rolSeleccionado: any = null;  // Variable para almacenar el grupo seleccionado
  
  mostrarFormulario = false;

  // Función para mostrar u ocultar el formulario de creación de grupos
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  constructor(private database: DatabaseService, private fb: FormBuilder) {

    // Inicializamos el formulario con el campo 'nombre' como obligatorio
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],  // Campo obligatorio para el nombre del grupo
    });

    // Formulario de modificación de grupos
    this.modificarRolForm = this.fb.group({
      nombre: ['', Validators.required],  // Campo obligatorio para modificar el nombre del grupo
    });
  }

  // Método para seleccionar un grupo y poblar el formulario de modificación
  editarRol(grupo: any) {
    this.rolSeleccionado = grupo;
    this.modificarRolForm.patchValue({
      nombre: grupo.nombre,  // Cargar el nombre del grupo seleccionado en el formulario
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarRolForm.valid) {
      const rolModificado = {
        ...this.rolSeleccionado,
        ...this.modificarRolForm.value
      };
      this.database.modificarGrupo(rolModificado, rolModificado.id ).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Rol modificado con éxito');
            this.rolSeleccionado = null;  // Ocultar el formulario después de modificar
            this.recuperarRoles();  // Actualizar la lista de grupos
          } else {
            alert('Error al modificar grupo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar grupo');
          console.error('Error:', error);
        },
      });
    }
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarRoles();  // Al iniciar el componente, se recuperan los grupos de la base de datos
  }

  // Método para manejar el envío del formulario de creación de grupos
  submitForm() {
    if (this.rolForm.valid) {
      const rolData = this.rolForm.value;  // Se obtienen los valores del formulario
      this.database.altaGrupo(rolData).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Rol creado con éxito');  // Se muestra un mensaje de éxito
            this.rolForm.reset();  // Se resetea el formulario
            this.recuperarRoles();  // Se actualiza la lista de grupos
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

  // Método para recuperar la lista de grupos de la base de datos
  recuperarRoles(): void {
    this.database.recuperarGrupo().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.grupos = response;  // Asigna los grupos recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.grupos = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        console.error('Error al recuperar grupos:', error);
      }
    });
  }
                  

  // Método para eliminar un grupo
  bajaRol(id: number) {
    this.database.bajaGrupo(id).subscribe({
      next: (response) => {
        if (response && response['resultado'] === 'OK') {
          alert('Rol borrado con éxito');
          this.recuperarRoles();  // Actualiza la lista de grupos
        } else {
          alert('Error al borrar grupo: ' + response['mensaje'] || 'Desconocido');
        }
      },
      error: (error) => {
        console.error('Error al borrar grupo:', error);
        alert('Hubo un error al intentar borrar el grupo. Revisa la consola para más detalles.');
      }
    });
  }
  
}
