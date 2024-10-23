// src/app/components/admin-login/admin-login.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/models/admin'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Asegúrate de que esto esté aquí

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin: Admin = { email: '', pass: '' }; // Inicializa la propiedad admin

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Aquí puedes implementar la lógica para iniciar sesión
    console.log('Intentando iniciar sesión con', this.admin);
    
    // Realiza una llamada al backend para verificar las credenciales
    this.http.post('http://localhost/backend/admin_login.php', this.admin).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Maneja la respuesta del servidor (redirigir, mostrar mensaje, etc.)
        alert('Inicio de sesión exitoso'); // Muestra un alert
        // Redirige a la página principal o carga la lista de administradores
        this.router.navigate(['/admin/users']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        // Maneja el error (mostrar mensaje de error, etc.)
      }
    );

  }
}
