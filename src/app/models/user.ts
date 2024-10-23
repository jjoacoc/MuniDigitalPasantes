export interface User {
    Id_Usuarios: number;       // ID del usuario
    Nombres: string;
    Email: string; // Nombre de usuario
    Pass?: string; // Contraseña (opcional, no se usa en el frontend)
  }