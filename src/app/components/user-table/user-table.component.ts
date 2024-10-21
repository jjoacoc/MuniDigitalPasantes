// src/app/components/user-table/user-table.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = []; // Aquí especificamos que 'users' es un array de User

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers(); // Llamamos a la función para obtener los usuarios cuando se inicializa el componente
  }

  getUsers() {
    this.http.get<User[]>('http://localhost/backend/get_users.php').subscribe(
      (data) => {
        this.users = data; // Guardamos los usuarios obtenidos del backend
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error); // Manejo de errores
      }
    );
  }

  editUser(userId: number) {
    // Aquí puedes implementar la lógica para editar el usuario
    console.log('Edit user with ID:', userId);
  }

  deleteUser(userId: number) {
    // Aquí puedes implementar la lógica para eliminar el usuario
    console.log('Delete user with ID:', userId);
  }
}
