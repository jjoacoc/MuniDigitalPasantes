import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../admin/services/database.service';

@Component({
  selector: 'app-registro-incidentes',
  templateUrl: './registro-incidentes.component.html',
  styleUrls: ['./registro-incidentes.component.css']
})
export class RegistroIncidentesComponent {

  incidenteForm: FormGroup;
  ciudadanoForm: FormGroup;

  constructor(private fb: FormBuilder, private database: DatabaseService) {

    this.incidenteForm = this.fb.group({
      areaServicio: ['', Validators.required],
      tipoIncidente: ['', Validators.required],
      prioridad: ['', Validators.required],
      origen: ['', Validators.required],
      datetime: ['', Validators.required],
      observaciones: ['']
    });

    this.ciudadanoForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      domicilio: [''],
      barrio: [''],
      telefono: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]]
    });
  }

  ngOnInit(): void {}

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
            email: response.email
          });
        } else {
          alert('Ciudadano no encontrado');
        }
      },
      error => {
        console.error(error);
        alert('Error al buscar ciudadano');
      }
    );
  }

  // Método para registrar el incidente
  registrarIncidente() {
    if (this.incidenteForm.valid && this.ciudadanoForm.valid) {
      const incidenteData = {
        ...this.incidenteForm.value,
        ...this.ciudadanoForm.value
      };

      this.database.registrarIncidente(incidenteData).subscribe(
        (response: any) => {
          alert('Incidente registrado con éxito');
          // Aquí puedes reiniciar los formularios si deseas
        },
        error => {
          console.error(error);
          alert('Error al registrar incidente');
        }
      );
    } else {
      alert('Por favor complete todos los campos obligatorios');
    }
  }



}
