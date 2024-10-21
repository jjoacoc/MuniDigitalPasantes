import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://localhost/api-php-miercoles/public/index.php';  // Aquí va la URL de tu API


  constructor(private http: HttpClient) { }

  altaRol(rolData: any): Observable<any> {
    console.log(rolData);
    return this.http.post(`${this.apiUrl}`, rolData);  // Enviamos los datos del rol
  }
  
  recuperarRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);  // Modificamos la URL para recuperar roles
  }
  
  bajaRol(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.apiUrl}../controllers/Router.php?id=${id}&entity=roles`);  // Incluimos 'entity' para especificar que trabajamos con roles
  }
  
  // Nuevo método para modificar un rol
  modificarRol(rol: any): Observable<any> {
    console.log(rol);
    return this.http.put(`${this.apiUrl}../controllers/Router.php?entity=roles`, rol);  // Enviamos los datos del rol a modificar
  }
  
}
