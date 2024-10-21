import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from '../../servis/api.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

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

  
  
  // Formulario reactivo para manejar los datos del rol
  rolForm: FormGroup;  
  roles: any[] = [];  // Variable para almacenar los roles recuperados de la base de datos

  modificarRolForm: FormGroup;  // Formulario para modificar un rol
  rolSeleccionado: any = null;  // Variable para almacenar el rol seleccionado
  
  mostrarFormulario = false;

  // Función para mostrar u ocultar el formulario de creación de roles
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  constructor(private database: ApiService, private fb: FormBuilder) {

    // Inicializamos el formulario con el campo 'nombre' como obligatorio
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],  // Campo obligatorio para el nombre del rol
    });

    // Formulario de modificación de roles
    this.modificarRolForm = this.fb.group({
      nombre: ['', Validators.required],  // Campo obligatorio para modificar el nombre del rol
    });
  }

  // Método para seleccionar un rol y poblar el formulario de modificación
  editarRol(rol: any) {
    this.rolSeleccionado = rol;
    this.modificarRolForm.patchValue({
      nombre: rol.nombre,  // Cargar el nombre del rol seleccionado en el formulario
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarRolForm.valid) {
      const rolModificado = {
        ...this.rolSeleccionado,
        ...this.modificarRolForm.value
      };
      this.database.modificarRol(rolModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Rol modificado con éxito');
            this.rolSeleccionado = null;  // Ocultar el formulario después de modificar
            this.recuperarRoles();  // Actualizar la lista de roles
          } else {
            alert('Error al modificar rol: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar rol');
          console.error('Error:', error);
        },
      });
    }
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarRoles();  // Al iniciar el componente, se recuperan los roles de la base de datos
  }

  // Método para manejar el envío del formulario de creación de roles
  submitForm() {
    if (this.rolForm.valid) {
      const rolData = this.rolForm.value;  // Se obtienen los valores del formulario
      this.database.altaRol(rolData).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Rol creado con éxito');  // Se muestra un mensaje de éxito
            this.rolForm.reset();  // Se resetea el formulario
            this.recuperarRoles();  // Se actualiza la lista de roles
          } else {
            alert('Error al crear rol: ' + (response['mensaje'] || 'Error desconocido'));
          }
          this.mostrarFormulario = !this.mostrarFormulario;  // Ocultar el formulario tras crear el rol
        },
        error: (error) => {
          alert('Error al crear rol');
          console.error('Error:', error);  // Se registra el error en la consola
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  // Método para recuperar la lista de roles de la base de datos
  recuperarRoles(): void {
    this.database.recuperarRoles().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.roles = response;  // Asigna los roles recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.roles = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        console.error('Error al recuperar roles:', error);
      }
    });
  }
                  

  // Método para eliminar un rol
  bajaRol(id: number) {
    this.database.bajaRol(id).subscribe({
      next: (response) => {
        if (response && response['resultado'] === 'OK') {
          alert('Rol borrado con éxito');
          this.recuperarRoles();  // Actualiza la lista de roles
        } else {
          alert('Error al borrar rol: ' + response['mensaje'] || 'Desconocido');
        }
      },
      error: (error) => {
        console.error('Error al borrar rol:', error);
        alert('Hubo un error al intentar borrar el rol. Revisa la consola para más detalles.');
      }
    });
  }
  
}
