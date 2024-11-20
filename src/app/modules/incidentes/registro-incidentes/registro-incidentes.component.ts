import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-registro-incidentes',
  templateUrl: './registro-incidentes.component.html',
  styleUrls: ['./registro-incidentes.component.css'],
})
export class RegistroIncidentesComponent implements OnInit {
  incidenteForm: FormGroup; // Formulario reactivo para manejar los datos de incidentes

  modificarIncidenteForm: FormGroup; // Formulario para modificar incidentes
  incidenteSeleccionado: any = null; // Variable para almacenar el incidente seleccionado
  mostrarForm = false;

  incidentes: any[] = []; // Variable para almacenar los incidentes recuperados de la base de datos
  AreaServicio: any[] = []; // Variable para almacenar las areas de servicio recuperados de la base de datos
  Origen: any[] = []; // Variable para almacenar el origen recuperado de la base de datos
  Prioridad: any[] = []; // Variable para almacenar las areas de servicio recuperados de la base de datos
  TiposIncidentes: any[] = []; // Variable para almacenar las areas de servicio recuperados de la base de datos
  Ciudadanos: any[] = []; // Variable para almacenar las areas de servicio recuperados de la base de datos

  constructor(private fb: FormBuilder, private database: DatabaseService) {
    // Inicializamos el formulario con 6 campos: areaServicio, tipoIncidente, prioridad, origen, datetime y observaciones
    this.incidenteForm = this.fb.group({
      // Inicializamos el formulario con 8 campos: dni, nombre, apelldio, sexo, domicilio, barrio, telefono, email
      Fecha_Hora: ['', Validators.required], // Campo obligatorio
      Observaciones: ['', Validators.required], // Campo opcional
      Id_Areas_Servicios: ['', Validators.required], // Campo obligatorio
      Id_Tipos_Incidentes: ['', Validators.required], // Campo obligatorio
      Id_Prioridad: ['', Validators.required], // Campo obligatorio
      Id_Origen: ['', Validators.required], // Campo obligatorio

      // ciudadano: this.fb.group({
      Dni: ['', Validators.required], //Campo obligatorio
      Apellido: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      Nombre: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      email: [{value: '', disabled: true,}, [Validators.required, Validators.email]], // Campo obligatorio y validación de formato de email
      sexo: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      Domicilio: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      Barrio: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      Telefono: [{value: '', disabled: true,}, [Validators.required]], //Campo obligatorio
      // }),
    });

    this.modificarIncidenteForm = this.fb.group({
      Fecha_Hora: ['', Validators.required], // Campo obligatorio
      Observaciones: ['', Validators.required], // Campo opcional
      Areas_Servicios: ['', Validators.required], // Campo obligatorio
      Tipos_Incidentes: ['', Validators.required], // Campo obligatorio
      Prioridad: ['', Validators.required], // Campo obligatorio
      Origen: ['', Validators.required], // Campo obligatorio
    });
  }

  ngOnInit(): void {
    this.recuperarIncidentes();
    this.recuperarAreaServicio();
    this.recuperarTiposIncidentes();
    this.recuperarOrigen();
    this.recuperarPrioridad();
    this.recuperarCiudadanos();
  }

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

  // Método para buscar ciudadano por DNI

  buscarCiudadano(Dni: String): void {
    const buscarDni = this.Ciudadanos.find(
      (ciudadano) => String(ciudadano.Dni) === Dni
      
    );

    console.log(buscarDni)
    if (buscarDni) {
      // this.Ciudadanos;
      this.incidenteForm.patchValue(buscarDni);
      this.habilitarCampos(true);
    } else {
      alert('Ciudadano no encontrado');
      this.habilitarCampos(true);
    }

    // this.obtenerDniCiudadanos().subscribe(
    // (data: any) => {
    // if (data) {
    // this.Ciudadanos
    // this.incidenteForm.patchValue(data);
    // this.habilitarCampos(false);
    // } else {
    // alert('Ciudadano no encontrado');
    // this.habilitarCampos(true)
    // }
    // },
    // (error) => {
    // this.habilitarCampos(true);
    // console.error(error);
    // alert('Error al buscar ciudadano');
    // },
    //  );
  }


  habilitarCampos(habilitar: boolean) {
    // Si se permite modificar los campos, habilitamos todos los controles
    if (habilitar) {
      this.incidenteForm.controls['Apellido'].enable();
      this.incidenteForm.controls['Nombre'].enable();
      this.incidenteForm.controls['email'].enable();
      this.incidenteForm.controls['Barrio'].enable();
      this.incidenteForm.controls['Domicilio'].enable();
      this.incidenteForm.controls['Telefono'].enable();
      this.incidenteForm.controls['sexo'].enable();
    } else {
      this.incidenteForm.controls['Apellido'].disable();
      this.incidenteForm.controls['Nombre'].disable();
      this.incidenteForm.controls['email'].disable();
      this.incidenteForm.controls['Barrio'].disable();
      this.incidenteForm.controls['Domicilio'].disable();
      this.incidenteForm.controls['Telefono'].disable();
      this.incidenteForm.controls['sexo'].disable();
    }
  }

  recuperarCiudadanos() {

    this.database.recuperarCiudadanos().subscribe({
      next: (response) => {
        console.log(response)
        if (Array.isArray(response)) {
          this.Ciudadanos = response; // Aquí vas a tener un array de objetos que contengan la información de los ciudadanos
        } else {

          console.error('La respuesta del servidor no es un array:', response);
          this.Ciudadanos = [];
        }
      },
      error: (error) => {
        console.error('Error al recuperar Ciudadanos:', error);
      },
    });
  }

  // Método para registrar el incidente
  submitForm() {
    if (this.incidenteForm.valid) {
      const incidenteData = this.incidenteForm.value; // Se obtienen los valores de los formularios
      this.database.registrarIncidentes(incidenteData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el incidente fue creado
          console.log('Respuesta del Servidor', response);
          if (response && response['message'] == 'OK') {
            alert('Incidente registrado con éxito');
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

  recuperarAreaServicio() {
    this.database.recuperarAreaServicio().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.AreaServicio = response; // Aquí debes tener un array de objetos que contengan Id_Areas_Servicios y descripcion
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.AreaServicio = [];
        }
      },
      error: (error) => {
        console.error('Error al recuperar Area de Servicio:', error);
      },
    });
  }
  obtenerDescripcionAreaServicio(Id_Areas_Servicios: any): string {
    const AreaServicio = this.AreaServicio.find(
      (a) => a.Id_Areas_Servicios === Id_Areas_Servicios
    );
    return AreaServicio ? AreaServicio.Descripcion : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
  }

  recuperarOrigen() {
    this.database.recuperarOrigen().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.Origen = response; // Aquí debes tener un array de objetos que contengan Id_Areas_Servicios y descripcion
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.Origen = [];
        }
      },
      error: (error) => {
        console.error('Error al recuperar Origen:', error);
      },
    });
  }
  obtenerDescripcionOrigen(Id_Origen: any): string {
    const Origen = this.Origen.find((o) => o.Id_Origen === Id_Origen);
    return Origen ? Origen.Descripcion : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
  }

  recuperarPrioridad() {
    this.database.recuperarPrioridad().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.Prioridad = response; // Aquí debes tener un array de objetos que contengan Id_Areas_Servicios y descripcion
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.Prioridad = [];
        }
      },
      error: (error) => {
        console.error('Error al recuperar Prioridad:', error);
      },
    });
  }
  obtenerDescripcionPrioridad(Id_Prioridad: any): string {
    const Prioridad = this.Prioridad.find(
      (p) => p.Id_Prioridad === Id_Prioridad
    );
    return Prioridad ? Prioridad.Gravedad : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
  }

  recuperarTiposIncidentes() {
    this.database.recuperarTiposIncidentes().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.TiposIncidentes = response; // Aquí debes tener un array de objetos que contengan Id_Areas_Servicios y descripcion
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.TiposIncidentes = [];
        }
      },
      error: (error) => {
        console.error('Error al recuperar Tipos de Incidentes:', error);
      },
    });
  }
  obtenerDescripcionTiposIncidentes(Id_Tipos_Incidentes: any): string {
    const TiposIncidente = this.TiposIncidentes.find(
      (t) => t.Id_Tipos_Incidentes === Id_Tipos_Incidentes
    );
    return TiposIncidente ? TiposIncidente.Descripcion : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
  }

  obtenerDescripcionCiudadanos(Id_Ciudadanos: any): string {
    const Ciudadanos = this.Ciudadanos.find(
      (c) => c.Id_Ciudadanos === Id_Ciudadanos
    );
    return Ciudadanos ? Ciudadanos.Apellido_Nombre : 'No Existe'; // Si no encuentra el grupo, muestra un mensaje
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
