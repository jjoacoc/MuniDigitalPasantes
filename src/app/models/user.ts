export interface User {
    Id_Usuarios: number;       // ID del usuario
    Nombres: string;
    email: string; // Nombre de usuario
    Pass?: string; // Contraseña (opcional, no se usa en el frontend)
  }