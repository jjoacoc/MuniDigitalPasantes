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

  modificarIncidenteForm: FormGroup; // Formulario para modificar incidentes
  incidenteSeleccionado: any = null; // Variable para almacenar el incidente seleccionado

  incidentes: any[] = []; // Variable para almacenar los incidentes recuperados de la base de datos

  constructor(private fb: FormBuilder, private database: DatabaseService) {
    // Inicializamos el formulario con 6 campos: areaServicio, tipoIncidente, prioridad, origen, datetime y observaciones
    this.incidenteForm = this.fb.group({
      // Inicializamos el formulario con 8 campos: dni, nombre, apelldio, sexo, domicilio, barrio, telefono, email
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], //Campo obligatorio que solo accepta numeros del 0 al 9 y limita a 8 digitos
      incidente: this.fb.group({
        areaServicio: ['', Validators.required], // Campo obligatorio
        tipoIncidente: ['', Validators.required], // Campo obligatorio
        prioridad: ['', Validators.required], // Campo obligatorio
        origen: ['', Validators.required], // Campo obligatorio
        datetime: ['', Validators.required], // Campo obligatorio
        observaciones: [''], // Campo opcional
      }),
      ciudadano: this.fb.group({
        nombre: ['', Validators.required], //Campo obligatorio
        apellido: ['', Validators.required], //Campo obligatorio
        sexo: ['', Validators.required], //Campo obligatorio
        domicilio: ['', Validators.required], //Campo obligatorio
        barrio: ['', Validators.required], //Campo obligatorio
        telefono: ['', [Validators.pattern(/^[0-9]{10}$/)]], //Campo obligatorio que solo accepta numeros del 0 al 9 y limita a 10 digitos
        email: ['', [Validators.required, Validators.email]], // Campo obligatorio y validación de formato de email
      }),
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

  // ngOnInit(): void {
  //   console.log(this.recuperarIncidentes());
  // }

  editarIncidente(incidente: any) {
    this.incidenteSeleccionado = incidente;
    this.modificarIncidenteForm.patchValue({
      areaServicio: incidente.areaServicio,
      tipoIncidente: incidente.tipoIncidente,
      prioridad: incidente.prioridad,
      origen: incidente.origen,
      datetime: incidente.datetime,
      observaciones: incidente.observaciones,
    });
  }

  desbloquearCampos() {
    const ciudadanoGroup = this.incidenteForm.get('ciudadano');
    ciudadanoGroup?.enable();
  }

  // Método para buscar ciudadano por DNI
  buscarCiudadano() {
    const dni = this.incidenteForm.get('dni')?.value;
    this.database.buscarCiudadanoPorDni(dni).subscribe(
      (response: any) => {
        if (response) {
          this.incidenteForm.patchValue({
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
  registrarIncidentes() {
    if (this.incidenteForm.valid && this.incidenteForm.valid) {
      const formData = this.incidenteForm.value && this.incidenteForm.value; // Se obtienen los valores de los formularios
      this.database.registrarIncidentes(formData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el incidente fue creado
          console.log('Respuesta del Servidor', response);
          if (response && response['message'] == 'OK') {
            alert('Incidente registrado con éxito');
            this.incidenteForm.reset();
            this.incidenteForm.reset();
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

  // Método para recuperar la lista de incidentes de la base de datos
  recuperarIncidentes() {
    this.database.recuperarIncidentes().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'incidentes'
        if (Array.isArray(response)) {
          this.incidentes = response; // Asigna los incidentes recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response); // Muestra error si no es un array
          this.incidentes = []; // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los incidentes, se registra en la consola
        console.error('Error al recuperar incidentes:', error);
      },
    });
  }

  bajaIncidentes(Id_Incidentes: number) {
    this.database.bajaIncidentes(Id_Incidentes).subscribe({
      next: (response) => {
        console.log(response); // Revisa qué está devolviendo la API
        if (response && response['message'] == 'OK') {
          alert('Incidente borrado con éxito');
          this.recuperarIncidentes();
        } else {
          alert(
            'Error al borrar incidente: ' + response['mensaje'] || 'Desconocido'
          );
        }
      },
      error: (error) => {
        console.error('Error al borrar incidente:', error);
        alert(
          'Hubo un error al intentar borrar el incidente. Revisa la consola para más detalles.'
        );
      },
    });
  }
}
