import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatabaseService } from 'src/app/modules/admin/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  hide = true;

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      Pass: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Formulario enviado'); 
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value); 
      this.databaseService.iniciarSesion(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor', response); // Agregado
          if (response && response.resultado === 'OK') {
            this.router.navigate(['/admin']);
            // Manejar el inicio de sesión exitoso
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al intentar iniciar sesión';
          console.error('Error:', error);
        }
      });
    } else {
      console.log('Formulario no válido'); // Agregado
      Object.keys(this.loginForm.controls).forEach(key => {
        const controlErrors = this.loginForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(errorKey => {
            console.log('Key control: ' + key + ', error: ' + errorKey + ', value: ', controlErrors[errorKey]);
          });
        }
      });
    }
  }
}
