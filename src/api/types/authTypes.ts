export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string; // <-- ADICIONADO: UUID
  name: string; // <-- ADICIONADO
  email: string;
  roles: string[]; // <-- ADICIONADO: Lista de papeis
  avatarUrl?: string; // <-- ADICIONADO
  displayName?: string; // <-- ADICIONADO
  bio?: string; // <-- ADICIONADO
}
