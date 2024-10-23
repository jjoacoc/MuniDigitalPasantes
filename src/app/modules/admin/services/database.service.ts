import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // URL base de la API en el backend
  private apiUrl = 'http://localhost/apiMiercoles/public/index.php';

  constructor(private http: HttpClient) {} // Inyecta HttpClient para usarlo en las peticiones

  // Nuevo método para iniciar sesión
  //iniciarSesion(credentials: any): Observable<any> {
  //  return this.http.post(`${this.apiUrl}/users?action=login`, credentials);
  //}


  // Método para modificar un usuario existente en la base de datos (PUT)
  modificarUsuarios(usuarioModificado: any, Id_Usuarios: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiMiercoles/public/index.php/users'
    // pasando el Id_Usuarios como parámetro en la URL, y los datos del usuario en el cuerpo de la solicitud
    return this.http.put(`${this.apiUrl}/users?Id_Usuarios=${Id_Usuarios}`, usuarioModificado);
  }

  // Método para crear un nuevo usuario en la base de datos (POST)
  altaUsuarios(usuarioData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php/users'
    // con los datos del usuario en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/users`, usuarioData);
  }

  // Método para recuperar todos los usuarios desde la base de datos (GET)
  recuperarUsuarios(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php/users'
    // para obtener la lista de usuarios
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Método para eliminar un usuario de la base de datos (DELETE)
  bajaUsuarios(Id_Usuarios: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiMiercoles/public/index.php/users'
    // pasando el Id_Usuarios como un parámetro en la URL
    return this.http.delete(`${this.apiUrl}/users?Id_Usuarios=${Id_Usuarios}`);
  }


  // Método para crear un nuevo grupo (POST)
  altaGrupo(grupoData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php/groups'
    // con los datos del grupo en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/groups`, grupoData);
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarGrupo(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php/groups'
    // para obtener la lista de grupos
    return this.http.get(`${this.apiUrl}/groups`);
  }

  // Método para eliminar un grupo de la base de datos (DELETE)
  bajaGrupo(Id_Grupos: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiMiercoles/public/index.php/groups'
    // pasando el Id_Grupos_Grupos como parámetro en la URL
    return this.http.delete(`${this.apiUrl}/groups?Id_Grupos=${Id_Grupos}`);
  }

  // Método para modificar un grupo existente en la base de datos (PUT)
  modificarGrupo(grupo: any, Id_Grupos: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiMiercoles/public/index.php/groups'
    // pasando el groupId_Grupos como parámetro en la URL, y los datos del grupo en el cuerpo de la solicitud
    return this.http.put(`${this.apiUrl}/groups?Id_Grupos=${Id_Grupos}`, grupo);
  }
}
