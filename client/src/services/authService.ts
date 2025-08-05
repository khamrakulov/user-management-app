import axios from "axios";
import { AuthResponse, LoginCredentials, RegisterData } from "../types";

// Change this to a relative path. Vite's proxy will handle forwarding to the backend.
// The browser will prepend its own origin (e.g., http://localhost:3001) to this.
const API_URL = "/api/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    // This will become e.g., http://localhost:3001/api/auth/login
    // The Vite proxy will then forward it to http://server:5062/api/auth/login
    `${API_URL}/login`,
    credentials
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    // This will become e.g., http://localhost:3001/api/auth/register
    `${API_URL}/register`,
    data
  );
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};