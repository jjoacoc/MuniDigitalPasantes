import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/backend'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  login(adminData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login.php`, adminData);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout.php`);
  }
}
