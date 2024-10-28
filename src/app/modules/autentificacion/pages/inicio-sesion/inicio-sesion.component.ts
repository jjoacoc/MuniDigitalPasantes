import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/modules/admin/services/database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  hide = true;

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  iniciarSesionlogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log(credentials);
      this.databaseService.iniciarSesion(credentials).subscribe({
        next: (data: any) => {
          if (data.token) {
            localStorage.setItem('token', data.token);

            this.router.navigate(['/inicio']); // Redirigir después de iniciar sesión
          } else {
            this.errorMessage = data.message || 'Credenciales inválidas';
            console.error('Login failed', this.errorMessage);
          }
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message ||
            'Error al iniciar sesión. Verifique sus credenciales';
          console.error('Login failed', error);
        },
      });
    }
  }
}
