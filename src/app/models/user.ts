export interface User {
    id: number;       // ID del usuario
    nombre: string;
    email: string; // Nombre de usuario
    pass?: string; // Contraseña (opcional, no se usa en el frontend)
  }