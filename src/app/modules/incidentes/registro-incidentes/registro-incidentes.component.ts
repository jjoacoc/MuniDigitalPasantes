import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-registro-incidentes',
  templateUrl: './registro-incidentes.component.html',
  styleUrls: ['./registro-incidentes.component.css'],
})
export class RegistroIncidentesComponent {

  incidenteForm: FormGroup; // Formulario reactivo para manejar los datos de incidentes
  ciudadanoForm: FormGroup; // Formulario reactivo para manejar los datos de los ciudadanos

  modificarIncidenteForm: FormGroup; // Formulario para modificar incidentes
  incidenteSeleccionado: any = null; // Variable para almacenar el usuario seleccionado

  incidentes: any [] = []; // Variable para almacenar los incidentes recuperados de la base de datos

  constructor(private fb: FormBuilder, private database: DatabaseService) {
    // Inicializamos el formulario con 6 campos: areaServicio, tipoIncidente, prioridad, origen, datetime y observaciones
    this.incidenteForm = this.fb.group({
      areaServicio: ['', Validators.required], // Campo obligatorio
      tipoIncidente: ['', Validators.required], // Campo obligatorio
      prioridad: ['', Validators.required], // Campo obligatorio
      origen: ['', Validators.required], // Campo obligatorio
      datetime: ['', Validators.required], // Campo obligatorio
      observaciones: [''], // Campo opcional
    });

    this.ciudadanoForm = this.fb.group({
      // Inicializamos el formulario con 8 campos: dni, nombre, apelldio, sexo, domicilio, barrio, telefono, email
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], //Campo obligatorio que solo accepta numeros del 0 al 9 y limita a 8 digitos
      nombre: ['', Validators.required], //Campo obligatorio
      apellido: ['', Validators.required], //Campo obligatorio
      sexo: ['', Validators.required], //Campo obligatorio
      domicilio: ['', Validators.required], //Campo obligatorio
      barrio: ['', Validators.required], //Campo obligatorio
      telefono: ['', [Validators.pattern(/^[0-9]{10}$/)]], //Campo obligatorio que solo accepta numeros del 0 al 9 y limita a 10 digitos
      email: ['', [Validators.required, Validators.email]], // Campo obligatorio y validación de formato de email
    });

    this.modificarIncidenteForm = this.fb.group({
      areaServicio: ['', Validators.required], // Campo obligatorio
      tipoIncidente: ['', Validators.required], // Campo obligatorio
      prioridad: ['', Validators.required], // Campo obligatorio
      origen: ['', Validators.required], // Campo obligatorio
      datetime: ['', Validators.required], // Campo obligatorio
      observaciones: [''], // Campo opcional
    });
  }

  ngOnInit(): void {
    console.log(this.recuperarIncidentes());
  }

  editarIncidente(incidente: any){
    this.incidenteSeleccionado = incidente;
    this.modificarIncidenteForm.patchValue({
      areaServicio: incidente.areaServicio,
      tipoIncidente: incidente.tipoIncidente,
      prioridad: incidente.prioridad,
      origen: incidente.origen,
      datetime: incidente.datetime,
      observaciones: incidente.observaciones
    });
  }

  // Método para buscar ciudadano por DNI
  buscarCiudadano() {
    const dni = this.ciudadanoForm.get('dni')?.value;
    this.database.buscarCiudadanoPorDni(dni).subscribe(
      (response: any) => {
        if (response) {
          this.ciudadanoForm.patchValue({
            nombre: response.nombre,
            apellido: response.apellido,
            sexo: response.sexo,
            domicilio: response.domicilio,
            barrio: response.barrio,
            telefono: response.telefono,
            email: response.email,
          });
        } else {
          alert('Ciudadano no encontrado');
        }
      },
      (error) => {
        console.error(error);
        alert('Error al buscar ciudadano');
      }
    );
  }

  // Método para registrar el incidente
  registrarIncidente() {
    if (this.incidenteForm.valid && this.ciudadanoForm.valid) {
      const formData = this.incidenteForm.value && this.ciudadanoForm.value;
      this.database.registrarIncidente(formData).subscribe({
        next: (response) => {
          console.log('Respuesta del Servidor', response);
          if (response && response['message'] == 'OK') {
            alert('Incidente registrado con éxito');
            this.incidenteForm.reset();
            this.ciudadanoForm.reset();
            this.recuperarIncidentes();
          } else {
            alert(
              'Error al registrar incidente: ' +
                (response['message'] || 'Error desconocido')
            );
          }
        },
        error: (error) => {
          alert('Error al crear el incidente');
          console.error('Error:', error);
        },
      });
    } else {
      alert('Por favor complete todos los campos obligatorios');
    }
  }

    // Método para recuperar la lista de usuarios de la base de datos
    recuperarIncidentes() {
      this.database.recuperarIncidentes().subscribe({
        next: (response) => {
          // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
          if (Array.isArray(response)) {
            this.incidentes = response;  // Asigna los incidentes recibidos
          } else {
            console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
            this.incidentes = [];  // Si la respuesta no es válida, se asigna un array vacío
          }
        },
        error: (error) => {
          // En caso de error al recuperar los usuarios, se registra en la consola
          console.error('Error al recuperar usuarios:', error);
        }
      });
    }
}
