import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // URL base de la API en el backend
  private apiUrl = 'http://localhost/apiMiercoles/public/index.php';

  constructor(private http: HttpClient) {} // Inyecta HttpClient para usarlo en las peticiones

  //TOKEN
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private createHeaders() {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  // Nuevo método para iniciar sesión
  iniciarSesion(credentials: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=login`, credentials, {
      headers,
    });
  }

  // Método para modificar un usuario existente en la base de datos (PUT)
  modificarUsuarios(usuarioModificado: any, Id_Usuarios: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiMiercoles/public/index.php?entity=users'
    // pasando el Id_Usuarios como parámetro en la URL, y los datos del usuario en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.put(
      `${this.apiUrl}?entity=users&id=${Id_Usuarios}`,
      usuarioModificado,
      { headers }
    );
  }

  // Método para crear un nuevo usuario en la base de datos (POST)
  altaUsuarios(usuarioData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=users'
    // con los datos del usuario en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=users`, usuarioData, {
      headers,
    });
  }

  // Método para recuperar todos los usuarios desde la base de datos (GET)
  recuperarUsuarios(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=users'
    // para obtener la lista de usuarios
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=users`, { headers });
  }

  // Método para eliminar un usuario de la base de datos (DELETE)
  bajaUsuarios(Id_Usuarios: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiMiercoles/public/index.php?entity=users'
    // pasando el Id_Usuarios como un parámetro en la URL
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrl}?entity=users&id=${Id_Usuarios}`, {
      headers,
    });
  }

  // Método para crear un nuevo grupo (POST)
  altaGrupo(grupoData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=groups'
    // con los datos del grupo en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=groups`, grupoData, {
      headers,
    });
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarGrupo(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=groups'
    // para obtener la lista de grupos
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=groups`, { headers });
  }

  // Método para eliminar un grupo de la base de datos (DELETE)
  bajaGrupo(Id_Grupos: number): Observable<any> {
    // Envía una solicitud DELETE a la URL 'http://localhost/apiMiercoles/public/index.php?entity=groups'
    // pasando el Id_Grupos_Grupos como parámetro en la URL
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrl}?entity=groups&id=${Id_Grupos}`, {
      headers,
    });
  }

  // Método para modificar un grupo existente en la base de datos (PUT)
  modificarGrupo(grupo: any, Id_Grupos: any): Observable<any> {
    // Envía una solicitud PUT a la URL 'http://localhost/apiMiercoles/public/index.php?entity=groups'
    // pasando el groupId_Grupos como parámetro en la URL, y los datos del grupo en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.put(
      `${this.apiUrl}?entity=groups&id=${Id_Grupos}`,
      grupo,
      { headers }
    );
  }


    // // Método para recuperar todos los grupos desde la base de datos (GET)
    recuperarAreasServicios(): Observable<any> {
      const headers = this.createHeaders();
      return this.http.get(`${this.apiUrl}?entity=areasServicios`, { headers });
    }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarTiposIncidentes(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=tipoIncidente'
    // para obtener la lista de grupos
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=tiposIncidentes`, { headers });
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarPrioridad(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=prioridad'
    // para obtener la lista de grupos
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=prioridad`, { headers });
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarOrigen(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=origen'
    // para obtener la lista de grupos
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=origen`, { headers });
  }

  // Método para recuperar todos los grupos desde la base de datos (GET)
  recuperarCiudadanos(): Observable<any> {
    // Envía una solicitud GET a la URL 'http://localhost/apiMiercoles/public/index.php?entity=ciudadano'
    // para obtener la lista de grupos
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=ciudadano`, { headers });
  }

  // // Método para modificar un ciudadano existente en la base de datos (PUT)
  // buscarCiudadanoPorDni(dni: string): Observable<any> {
  //   const headers = this.createHeaders();
  //   return this.http.get(`${this.apiUrl}?entity=ciudadano=${dni}`, { headers});
  // }

  // Método para crear un nuevo incidente (POST)
  registrarIncidentes(incidenteData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=incident'
    // con los datos del incidente en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=incident`, incidenteData, {
      headers,
    });
  }
  // Método para crear un nuevo incidente (POST)
  recuperarIncidentes(): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=incident'
    // con los datos del incidente en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}?entity=incident`, { headers });
  }
  // Método para crear un nuevo incidente (POST)
  bajaIncidentes(incidenteData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=incident'
    // con los datos del incidente en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=incident&id`, incidenteData, {
      headers,
    });
  }
  // Método para crear un nuevo incidente (POST)
  modificarIncidentes(incidenteData: any): Observable<any> {
    // Envía una solicitud POST a la URL 'http://localhost/apiMiercoles/public/index.php?entity=incident'
    // con los datos del incidente en el cuerpo de la solicitud
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}?entity=incident&id`, incidenteData, {
      headers,
    });
  }
}
