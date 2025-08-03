export interface User {
  id: number;
  name: string;
  email: string;
  lastLoginTime: string | null;
  registrationTime: string;
  status: "Active" | "Blocked";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface ActionResponse {
  message: string;
}
