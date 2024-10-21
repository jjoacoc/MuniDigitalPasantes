import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost/backend'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin_register.php`, userData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users.php`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete_user.php`, { id });
  }
}
