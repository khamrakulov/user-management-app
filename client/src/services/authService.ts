import axios from "axios";
import { AuthResponse, LoginCredentials, RegisterData } from "../types";

// Dynamically determine the API base URL from environment variables.
// For Vite, environment variables are accessed via import.meta.env and must be prefixed with VITE_APP_ (by default).
// The || "http://localhost:5062" provides a fallback for local development outside Docker.
const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5062";

// This remains the specific path for authentication endpoints
const AUTH_API_PATH = "/api/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    // Combine the base URL with the specific path
    `${BASE_API_URL}${AUTH_API_PATH}/login`,
    credentials
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    // Combine the base URL with the specific path
    `${BASE_API_URL}${AUTH_API_PATH}/register`,
    data
  );
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

// import axios from "axios";
// import { AuthResponse, LoginCredentials, RegisterData } from "../types";

// const API_URL = "/api/auth";

// export const login = async (
//   credentials: LoginCredentials
// ): Promise<AuthResponse> => {
//   const response = await axios.post<AuthResponse>(
//     `${API_URL}/login`,
//     credentials
//   );
//   if (response.data.token) {
//     localStorage.setItem("token", response.data.token);
//   }
//   return response.data;
// };

// export const register = async (data: RegisterData): Promise<AuthResponse> => {
//   const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
//   return response.data;
// };

// export const logout = () => {
//   localStorage.removeItem("token");
// };
